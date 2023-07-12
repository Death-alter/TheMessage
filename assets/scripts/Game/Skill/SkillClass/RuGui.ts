import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { skill_ru_gui_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardActionLocation, WaitingType } from "../../../GameManager/type";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

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
          playerId: data.playerId,
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

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用【如归】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          gui.showCardsWindow.show({
            title: "请选择一张情报",
            limit: 1,
            cardList: gui.data.selfPlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_GUI_TOS, {
                    enable: true,
                    cardId: gui.showCardsWindow.selectedCards.list[0].id,
                    seq: gui.seq,
                  });
                  gui.showCardsWindow.hide();
                },
                enabled: () => !!gui.showCardsWindow.selectedCards.list.length,
              },
            ],
          });
        },
        enabled: gui.data.selfPlayer.messageCounts.total > 0,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_GUI_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId, enable }: skill_ru_gui_toc) {
    if (enable) {
      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

      const player = gameData.playerList[playerId];
      const turnPlayer = gameData.playerList[gameData.turnPlayerId];
      const gameLog = gameData.gameLog;
      const message = player.removeMessage(cardId);
      turnPlayer.addMessage(message);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: turnPlayer,
        message,
        from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: player },
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【如归】`));
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}把情报${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
            turnPlayer
          )}的情报区`
        )
      );

      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }
  }
}
