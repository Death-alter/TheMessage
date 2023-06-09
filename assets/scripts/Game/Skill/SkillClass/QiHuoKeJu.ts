import { skill_qi_huo_ke_ju_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import GamePools from "../../../GameManager/GamePools";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";

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

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你接收了双色情报，是否使用【奇货可居】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          gameData.gameObject.showCardsWindow.show({
            title: "请从情报区选择一张牌",
            cardList: gameData.selfPlayer.getMessagesCopy(),
            limit: 1,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_QI_HUO_KE_JU_TOS, {
                    cardId: gameData.gameObject.showCardsWindow.selectedCards.list[0].id,
                    seq: gameData.gameObject.seq,
                  });
                  gameData.gameObject.showCardsWindow.hide();
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
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId }: skill_qi_huo_ke_ju_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;
    const message = player.removeMessage(cardId);
    player.addHandCard(message);
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【奇货可居】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}将情报区的${gameLog.formatCard(message)}加入手牌`
      )
    );

    if (playerId === 0) {
      message.gameObject = GamePools.cardPool.get();
      gameData.gameObject.cardAction.addCardToHandCard({ player, card: message }, gameData.gameObject.handCardList);
    }
  }
}
