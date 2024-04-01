import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import {
  skill_wait_for_workers_are_knowledgable_toc,
  skill_workers_are_knowledgable_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter,  UIEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, UIEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { CardColor } from "../../Card/type";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { TagName } from "../../../type";
import { GameLog } from "../../GameLog/GameLog";

export class GongRenYouZhiShi extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "咱们工人有知识",
      character,
      description:
        "♦你每有一张红色或蓝色情报，摸牌阶段多摸一张牌。\n♦传出左右方向的情报时，你每有一张黑色情报，可以指定一名角色本回合不能选择接收情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_WORKERS_ARE_KNOWLEDGABLE_TOC,
      (data) => {
        this.waitingForUse(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WORKERS_ARE_KNOWLEDGABLE_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_WORKERS_ARE_KNOWLEDGABLE_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WORKERS_ARE_KNOWLEDGABLE_TOC);
  }

  waitingForUse(gameData: GameData, { playerId, waitingSecond, seq }: skill_wait_for_workers_are_knowledgable_toc) {
    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.USE_SKILL,
      seq: seq,
      params: {
        skill: this,
      },
    });
  }

  onTrigger(gui: GameManager, params): void {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`你传出了情报,是否使用【咱们工人有知识】？`);
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
          tooltipText: `请选择最多${gui.data.selfPlayer.messageCounts[CardColor.BLACK]}名角色`,
          num: gui.data.selfPlayer.messageCounts[CardColor.BLACK],
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_WORKERS_ARE_KNOWLEDGABLE_TOS, {
          enable: true,
          targetPlayerId: data[0].players.map((player) => player.id),
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_WORKERS_ARE_KNOWLEDGABLE_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId }: skill_workers_are_knowledgable_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    for (const id of targetPlayerId) {
      const targetPlayer = gameData.playerList[id];
      targetPlayer.addTag(TagName.CANNOT_RECEIVE_MESSAGE);
      GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
        targetPlayer.removeTag(TagName.CANNOT_RECEIVE_MESSAGE);
      });
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}本回合不能选择接收情报`));
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
