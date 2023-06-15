import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import {
  skill_jian_ren_a_toc,
  skill_jian_ren_b_toc,
  skill_jiang_hu_ling_a_toc,
  skill_wait_for_jiang_hu_ling_b_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class JiangHuLing extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "江湖令",
      character,
      description:
        "你传出情报后，可以宣言一个颜色。本回合中，当情报被接收后，你可以从接收者的情报区弃置一张被宣言颜色的情报，若弃置的是黑色情报，则你摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIANG_HU_LING_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIANG_HU_LING_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_A_TOC,
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
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_B_TOC,
      (data) => {
        this.waitingForUseB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIANG_HU_LING_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIANG_HU_LING_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_JIANG_HU_LING_B_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你传出了情报,是否使用【江湖令】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText("请宣言一个颜色");
          tooltip.buttons.setButtons([
            {
              text: "红",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
                  enable: true,
                  color: CardColor.RED,
                  seq: gameData.gameObject.seq,
                });
              },
            },
            {
              text: "蓝",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
                  enable: true,
                  color: CardColor.BLUE,
                  seq: gameData.gameObject.seq,
                });
              },
            },
            {
              text: "黑",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
                  enable: true,
                  color: CardColor.BLACK,
                  seq: gameData.gameObject.seq,
                });
              },
            },
          ]);
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
            enable: false,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  waitingForUseB(gameData: GameData, { playerId, color, waitingSecond, seq }: skill_wait_for_jiang_hu_ling_b_toc) {
    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText("情报被接收，是否使用【江湖令】？");
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {},
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
  }

  onEffectA(gameData: GameData, { playerId, color }: skill_jiang_hu_ling_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;

    let str = `【${player.seatNumber + 1}号】${player.character.name}使用技能【江湖令】，宣言`;
    switch (<number>color) {
      case CardColor.BLACK:
        str += "黑色";
        break;
      case CardColor.RED:
        str += "红色";
        break;
      case CardColor.BLUE:
        str += "蓝色";
        break;
    }
    gameLog.addData(new GameLog(str));
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_jian_ren_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;

    const message = targetPlayer.removeMessage(cardId);
    gameData.gameObject.cardAction.removeMessage({ player: targetPlayer, messageList: [message] });

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}从【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }的情报区弃置${gameLog.formatCard(message)}`
      )
    );
  }
}
