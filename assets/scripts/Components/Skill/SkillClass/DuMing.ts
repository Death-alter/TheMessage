import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_du_ming_a_toc, skill_du_ming_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { CardColor, CardStatus, CardUsableStatus } from "../../Card/type";
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
        "一回合一次，情报面朝下传递到你面前时，或【调包】结算后，你可以宣言一个颜色，查看该情报并面朝下放回，然后摸一张牌。若待接收情报不含有宣言的颜色，并且你有纯黑色手牌，你必须将一张纯黑色手牌置入你的情报区。",
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
      })
      .start();
  }

  onEffectA(gameData: GameData, { playerId, color, card, waitingSecond, seq }: skill_du_ming_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

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

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}宣言${getCardColorText(<number>color)}色`));

    const message = gameData.createMessage(card);
    if (playerId === 0) {
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      GameEventCenter.emit(GameEvent.PLAYER_VIEW_MESSAGE, { player, message });

      if (waitingSecond > 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "promprtSelectHandCard",
        });
      }
    }

    if (waitingSecond === 0) {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }

  promprtSelectHandCard(gui: GameManager) {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText("请选择一张纯黑色手牌置入情报区");
          gui.gameLayer.startSelectHandCards({
            num: 1,
            filter: (card: Card) => {
              if (card.color.length === 1 && card.color[0] === CardColor.BLACK) {
                return CardUsableStatus.USABLE;
              } else {
                return CardUsableStatus.UNUSABLE;
              }
            },
          });
          gui.tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next({ cards: [...gui.selectedHandCards.list] });
              },
              enabled: () => gui.selectedHandCards.list.length === 1,
            },
          ]);
        },
      }),
    })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_MING_B_TOS, {
          cardId: data[0].cards[0].id,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, card }: skill_du_ming_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    const message = gameData.playerRemoveHandCard(player, card);
    player.addMessage(message);

    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player,
      message,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把手牌${gameLog.formatCard(message)}置入自己的情报区`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
