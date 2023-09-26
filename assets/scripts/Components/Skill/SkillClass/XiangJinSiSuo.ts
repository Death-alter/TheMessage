import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_xiang_jin_si_suo_a_toc, skill_xiang_jin_si_suo_b_toc } from "../../../../protobuf/proto";
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

export class XiangJinSiSuo extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "详尽思索",
      character,
      description: "一名角色传出情报后，你可以指定一名角色。若本回合该角色接收了情报，你摸两张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_XIANG_JIN_SI_SUO_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_XIANG_JIN_SI_SUO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_XIANG_JIN_SI_SUO_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
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
    NetworkEventCenter.off(NetworkEventToC.SKILL_XIANG_JIN_SI_SUO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_XIANG_JIN_SI_SUO_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_XIANG_JIN_SI_SUO_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`一名角色传出了情报,是否使用【详尽思索】？`);
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
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_XIANG_JIN_SI_SUO_A_TOS, {
          enable: true,
          targetPlayerId: data[0].players[0].id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_XIANG_JIN_SI_SUO_A_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectA(gameData: GameData, { playerId, enable, targetPlayerId }: skill_xiang_jin_si_suo_a_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameLog;

      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
        player,
        skill: this,
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}指定了${gameLog.formatPlayer(targetPlayer)}`));
    }
  }

  onEffectB(gameData: GameData, { playerId }: skill_xiang_jin_si_suo_b_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
