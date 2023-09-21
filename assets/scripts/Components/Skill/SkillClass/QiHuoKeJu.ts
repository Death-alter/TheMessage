import { skill_qi_huo_ke_ju_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { CardActionLocation } from "../../../Manager/type";

export class QiHuoKeJu extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "奇货可居",
      character,
      description: "你接收双色情报后，可以从你的情报区选择一张情报加入你的手牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_QI_HUO_KE_JU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_QI_HUO_KE_JU_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了双色情报，是否使用【奇货可居】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          gui.showCardsWindow.show({
            title: "请从情报区选择一张牌",
            cardList: gui.data.selfPlayer.getMessagesCopy(),
            limit: 1,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_QI_HUO_KE_JU_TOS, {
                    cardId: gui.showCardsWindow.selectedCards.list[0].id,
                    seq: gui.seq,
                  });
                  gui.showCardsWindow.hide();
                },
              },
            ],
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId }: skill_qi_huo_ke_ju_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    const message = player.removeMessage(cardId);
    gameData.playerAddHandCard(player, message);

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}将情报区的${gameLog.formatCard(message)}加入手牌`));
    
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
