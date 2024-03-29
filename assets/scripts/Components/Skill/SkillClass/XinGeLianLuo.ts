import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_xin_ge_lian_luo_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { TagName } from "../../../type";

export class XinGeLianLuo extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "信鸽联络",
      character,
      description: "你传出左右方向的情报后，可以指定一名其他角色。本回合中，该角色不能选择接收情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_XIN_GE_LIAN_LUO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_XIN_GE_LIAN_LUO_TOC,
      (data) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_XIN_GE_LIAN_LUO_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_XIN_GE_LIAN_LUO_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`你传出了左右方向的情报,是否使用【信鸽联络】？`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next();
              },
            },
            {
              text: "取消",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player) => player.id !== 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_XIN_GE_LIAN_LUO_TOS, {
          enable: true,
          targetPlayerId: data[0].players[0].id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_XIN_GE_LIAN_LUO_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId }: skill_xin_ge_lian_luo_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    targetPlayer.addTag(TagName.CANNOT_RECEIVE_MESSAGE);
    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      targetPlayer.removeTag(TagName.CANNOT_RECEIVE_MESSAGE);
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}指定了${gameLog.formatPlayer(targetPlayer)}`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
