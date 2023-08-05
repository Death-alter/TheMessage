import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import {
  color,
  skill_jiang_hu_ling_a_toc,
  skill_jiang_hu_ling_b_toc,
  skill_wait_for_jiang_hu_ling_b_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { getCardColorText } from "../../../Utils";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";

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

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
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
                  seq: gui.seq,
                });
              },
            },
            {
              text: "蓝",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
                  enable: true,
                  color: CardColor.BLUE,
                  seq: gui.seq,
                });
              },
            },
            {
              text: "黑",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_A_TOS, {
                  enable: true,
                  color: CardColor.BLACK,
                  seq: gui.seq,
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
            seq: gui.seq,
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
      const messagePlayer = gameData.playerList[gameData.messagePlayerId];
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promprtUse",
        params: {
          color,
          messagePlayer,
        },
      });
    }
  }

  promprtUse(gui: GameManager, params: { color: color; messagePlayer: Player }) {
    const { color, messagePlayer } = params;
    const tooltip = gui.tooltip;

    tooltip.setText("情报被接收，是否使用【江湖令】？");
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const showCardsWindow = gui.showCardsWindow;
          showCardsWindow.show({
            title: `请选择一张${getCardColorText(<number>color)}色情报弃置`,
            limit: 1,
            cardList: messagePlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_JIANG_HU_LING_B_TOS, {
                    cardId: showCardsWindow.selectedCards.list[0].id,
                    seq: gui.seq,
                  });
                  showCardsWindow.hide();
                },
                enabled: () =>
                  showCardsWindow.selectedCards.list.length &&
                  Card.hasColor(showCardsWindow.selectedCards.list[0], <number>color),
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

  onEffectA(gameData: GameData, { playerId, color }: skill_jiang_hu_ling_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}使用技能【江湖令】，宣言${getCardColorText(<number>color)}色`)
    );
  }

  onEffectB(gameData: GameData, { playerId, cardId }: skill_jiang_hu_ling_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    const messagePlayer = gameData.playerList[gameData.messagePlayerId];

    const message = messagePlayer.removeMessage(cardId);

    GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player: messagePlayer, messageList: [message] });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}从${gameLog.formatPlayer(messagePlayer)}的情报区弃置${gameLog.formatCard(
          message
        )}`
      )
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
