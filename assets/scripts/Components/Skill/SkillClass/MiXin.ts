import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameManager } from "../../../Manager/GameManager";
import { skill_mi_xin_a_toc, skill_mi_xin_b_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Card } from "../../Card/Card";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { CardActionLocation, WaitingType } from "../../../Manager/type";

export class MiXin extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "密信",
      character,
      description:
        "你接收其他角色传出的情报后，可以翻开此角色，摸两张牌，然后将一张含有该情报不同颜色的手牌置入传出者的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MI_XIN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MI_XIN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MI_XIN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_MI_XIN_B_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`你接收了其他人传出的情报，是否使用【密信】？`);
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
      .onComplete(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MI_XIN_A_TOS, {
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, messageCard, waitingSecond, seq }: skill_mi_xin_a_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0 && waitingSecond) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "selectHandcard",
        params: {
          message: gameData.createCard(messageCard),
        },
      });
    }
  }

  selectHandcard(gui: GameManager, params: { message: Card }) {
    const { message } = params;
    const color = [CardColor.RED, CardColor.BLUE, CardColor.BLACK];
    for (const c of message.color) {
      color.splice(color.indexOf(c), 1);
    }
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        filter: (card: Card) => {
          let flag = false;
          for (const c of color) {
            if (Card.hasColor(card, c)) {
              flag = true;
              break;
            }
          }

          if (flag) {
            return CardUsableStatus.USABLE;
          } else {
            return CardUsableStatus.UNUSABLE;
          }
        },
        canCancel: false,
      },
    })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MI_XIN_B_TOS, {
          cardId: data[0].cards[0].id,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card }: skill_mi_xin_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const handCard = gameData.playerRemoveHandCard(player, card);
    targetPlayer.addMessage(handCard);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: handCard,
      from: {
        location: CardActionLocation.PLAYER_HAND_CARD,
        player,
      },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
          targetPlayer
        )}的情报区`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
