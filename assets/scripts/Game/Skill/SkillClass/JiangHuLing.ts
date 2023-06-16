import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import {
  skill_jiang_hu_ling_a_toc,
  skill_jiang_hu_ling_b_toc,
  skill_wait_for_jiang_hu_ling_b_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { getCardColorText } from "../../../Utils";

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
          onclick: () => {
            const showCardsWindow = gameData.gameObject.showCardsWindow;
            showCardsWindow.show({
              title: `请选择一张${getCardColorText(<number>color)}色情报弃置`,
              limit: 1,
              cardList: gameData.playerList[gameData.messagePlayerId].getMessagesCopy(),
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_B_TOS, {
                      cardId: showCardsWindow.selectedCards.list[0].id,
                      seq,
                    });
                    showCardsWindow.hide();
                  },
                  enabled: () =>
                    showCardsWindow.selectedCards.list.length &&
                    showCardsWindow.selectedCards.list[0].color.indexOf(<number>color) !== -1,
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
  }

  onEffectA(gameData: GameData, { playerId, color }: skill_jiang_hu_ling_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;

    let str = `【${player.seatNumber + 1}号】${player.character.name}使用技能【江湖令】，宣言${getCardColorText(
      <number>color
    )}色`;
    gameLog.addData(new GameLog(str));
  }

  onEffectB(gameData: GameData, { playerId, cardId }: skill_jiang_hu_ling_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;
    const messagePlayer = gameData.playerList[gameData.messagePlayerId];

    const message = messagePlayer.removeMessage(cardId);
    gameData.gameObject.cardAction.removeMessage({ player: messagePlayer, messageList: [message] });

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}从【${messagePlayer.seatNumber + 1}号】${
          messagePlayer.character.name
        }的情报区弃置${gameLog.formatCard(message)}`
      )
    );
  }
}
