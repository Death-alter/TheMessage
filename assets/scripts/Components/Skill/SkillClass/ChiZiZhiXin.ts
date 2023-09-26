import { skill_chi_zi_zhi_xin_a_toc, skill_chi_zi_zhi_xin_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { TriggerSkill } from "../Skill";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../Card/Card";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class ChiZiZhiXin extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "赤子之心",
      character,
      description:
        "你传出的非黑色情报被其他角色接收后，你可以摸两张牌，或从手牌中选择一张含有该情报颜色的牌，将其置入你的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_B_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你传出的非黑色情报被接收，是否使用【赤子之心】？`);
    tooltip.buttons.setButtons([
      {
        text: "是",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CHI_ZI_ZHI_XIN_A_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "否",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, messageCard, waitingSecond, seq }: skill_chi_zi_zhi_xin_a_toc) {
    const player = gameData.playerList[playerId];
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

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseAction",
        params: {
          message: gameData.createCard(messageCard),
        },
      });
    }
  }

  promptChooseAction(gui: GameManager, params: { message: Card }) {
    const tooltip = gui.tooltip;
    const { message } = params;
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText("请选择一项操作");
          tooltip.buttons.setButtons([
            {
              text: "摸两张牌",
              onclick: () => {
                next({ drawCard: true });
              },
            },
            {
              text: "置入情报",
              onclick: () => {
                next({ drawCard: false });
              },
              enabled: () =>
                Card.hasColor(gui.data.handCardList.list, message.color[0]) ||
                Card.hasColor(gui.data.handCardList.list, message.color[1]),
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
          handler: ({ current }, { next, prev, passOnPrev }) => {
            if (current.drawCard) {
              passOnPrev(() => {
                next();
              });
            } else {
              tooltip.setText("请选择一张手牌置入情报区");
              gui.gameLayer.startSelectHandCards({ num: 1 });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    next({ cardId: gui.selectedHandCards.list[0].id });
                  },
                  enabled: () => {
                    if (gui.selectedHandCards.list.length === 0) return false;
                    for (let c of message.color) {
                      if (Card.hasColor(gui.selectedHandCards.list[0], c)) {
                        return true;
                      }
                    }
                    return false;
                  },
                },
              ]);
            }
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_CHI_ZI_ZHI_XIN_B_TOS, {
          drawCard: data[1].drawCard,
          cardId: data[0].cardId,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, card, drawCard }: skill_chi_zi_zhi_xin_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    if (!drawCard) {
      const handCard = gameData.playerRemoveHandCard(player, card);
      player.addMessage(handCard);

      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: player,
        message: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入情报区`));
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
