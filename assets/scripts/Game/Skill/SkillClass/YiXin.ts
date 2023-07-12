import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_yi_xin_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS, GameEvent } from "../../../Event/type";
import { WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class YiXin extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "遗信",
      character,
      description: "你死亡前，可以将一张手牌置入另一名角色的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_XIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC,
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
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_XIN_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC);
  }

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用【遗信】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张手牌和一名角色`);
          gui.startSelectHandCard({
            num: 1,
          });
          gui.startSelectPlayer({
            num: 1,
            filter: (player) => player.id !== 0,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_XIN_TOS, {
                  enable: true,
                  cardId: gui.selectedHandCards.list[0].id,
                  targetPlayerId: gui.selectedPlayers.list[0].id,
                  seq: gui.seq,
                });
              },
              enabled: () => gui.selectedHandCards.list.length > 0 && gui.selectedPlayers.list.length > 0,
            },
          ]);
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_XIN_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card, enable }: skill_yi_xin_toc) {
    if (enable) {
      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameLog;

      const handCard = gameData.playerRemoveHandCard(player, card);
      targetPlayer.addMessage(handCard);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: player },
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【遗信】`));
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}把手牌${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
            targetPlayer
          )}的情报区`
        )
      );

      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }
  }
}
