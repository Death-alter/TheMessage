import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { skill_ru_gui_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardActionLocation, WaitingType } from "../../../GameManager/type";

export class RuGui extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "如归",
      character,
      description: "你死亡前，可以将你情报区中的一张情报置入当前回合角色的情报区中。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_RU_GUI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_RU_GUI_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.waitingPlayerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_RU_GUI_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_RU_GUI_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`是否使用【如归】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          gameData.gameObject.showCardsWindow.show({
            title: "请选择一张情报",
            limit: 1,
            cardList: gameData.selfPlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_GUI_TOS, {
                    enable: true,
                    cardId: gameData.gameObject.showCardsWindow.selectedCards.list[0].id,
                    seq: gameData.gameObject.seq,
                  });
                  gameData.gameObject.showCardsWindow.hide();
                },
                enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
              },
            ],
          });
        },
        enabled: gameData.selfPlayer.messageCounts.total > 0,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_GUI_TOS, {
            enable: false,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId, enable }: skill_ru_gui_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const turnPlayer = gameData.playerList[gameData.turnPlayerId];
      const gameLog = gameData.gameObject.gameLog;
      const message = player.removeMessage(cardId);
      turnPlayer.addMessage(message);
      gameData.gameObject.cardAction.addCardToMessageZone({
        player: turnPlayer,
        card: message,
        from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: player },
      });

      gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【如归】`));
      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}把情报${gameLog.formatCard(message)}置入【${
            turnPlayer.seatNumber + 1
          }号】${turnPlayer.character.name}的情报区`
        )
      );
    }
  }
}
