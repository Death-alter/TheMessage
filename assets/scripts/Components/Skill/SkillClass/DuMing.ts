import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import {
  color,
  skill_du_ming_a_toc,
  skill_jiang_hu_ling_a_toc,
  skill_jiang_hu_ling_b_toc,
  skill_wait_for_jiang_hu_ling_b_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { getCardColorText } from "../../../Utils";
import { Card } from "../../Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class DuMing extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "赌命",
      character,
      description:
        "情报面朝下传递到你面前时，或【调包】结算后，你可以宣言一个颜色，查看该情报并面朝下放回，然后摸一张牌。若待接收情报不含有宣言的颜色，并且你有黑色手牌，你必须将一张黑色手牌置入你的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_MING_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_MING_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_DU_MING_TOC,
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
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_MING_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_MING_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_DU_MING_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`是否使用【赌命】？`);
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
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            const tooltip = gui.tooltip;
            tooltip.setText("请宣言一个颜色");
            tooltip.buttons.setButtons([
              {
                text: "红",
                onclick: () => {
                  next({ color: CardColor.RED });
                },
              },
              {
                text: "蓝",
                onclick: () => {
                  next({ color: CardColor.BLUE });
                },
              },
              {
                text: "黑",
                onclick: () => {
                  next({ color: CardColor.BLACK });
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
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_MING_A_TOS, {
          enable: true,
          color: data[0].color,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_MING_A_TOS, {
          enable: false,
          seq: gui.seq,
        });
      });
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

  onEffectA(gameData: GameData, { playerId, enable, color, card, waitingSecond, seq }: skill_du_ming_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    if(enable){
      
    }

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}使用技能【赌命】，宣言${getCardColorText(<number>color)}色`)
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
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
