import {
  skill_jian_di_feng_xing_a_toc,
  skill_jian_di_feng_xing_b_toc,
  skill_jian_di_feng_xing_c_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { TriggerSkill } from "../Skill";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../Card/Card";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class JianDiFengXing extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "歼敌风行",
      character,
      description:
        "当你传出的情报被其他角色接收后，你可以摸两张牌，将一张纯黑色手牌置入自己的情报区，然后可以弃置接收的情报，用一张黑色手牌代替之。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_DI_FENG_XING_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_DI_FENG_XING_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_DI_FENG_XING_C_TOC,
      (data) => {
        this.onEffectC(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_DI_FENG_XING_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_DI_FENG_XING_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_DI_FENG_XING_C_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你传出的情报被接收，是否使用【歼敌风行】？`);
    tooltip.buttons.setButtons([
      {
        text: "是",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_DI_FENG_XING_A_TOS, {
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

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_jian_di_feng_xing_a_toc) {
    const player = gameData.playerList[playerId];
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    if (waitingSecond > 0) {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "selectHandCard",
        });
      }
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }

  selectHandCard(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张纯黑色手牌置入你的情报区",
        filter: (card: Card) => {
          if (card.color.length === 1 && card.color[0] === CardColor.BLACK) {
            return CardUsableStatus.USABLE;
          } else {
            return CardUsableStatus.UNUSABLE;
          }
        },
        enabled: () => gui.selectedHandCards.list.length === 1,
      },
    })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_DI_FENG_XING_B_TOS, {
          cardId: data[0].cards[0].id,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_jian_di_feng_xing_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    if (waitingSecond > 0) {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      const handCard = gameData.playerRemoveHandCard(player, card);
      player.addMessage(handCard);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player,
        message: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入自己的情报区`),
      );

      if (playerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "chooseRemoveMessage",
        });
      }
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }

  chooseRemoveMessage(gui: GameManager) {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`是否弃置待收情报，并用一张黑色手牌代替之？`);
          tooltip.buttons.setButtons([
            {
              text: "是",
              onclick: () => {
                next();
              },
            },
            {
              text: "否",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_HAND_CARDS,
        data: {
          tooltipText: "请选择一张黑色手牌",
          filter: (card: Card) => {
            if (Card.hasColor(card, CardColor.BLACK)) {
              return CardUsableStatus.USABLE;
            } else {
              return CardUsableStatus.UNUSABLE;
            }
          },
          enabled: () => gui.selectedHandCards.list.length === 1,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_DI_FENG_XING_C_TOS, {
          enable: true,
          cardId: data[0].cards[0].id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_DI_FENG_XING_C_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectC(gameData: GameData, { playerId, enable, card, oldMessageCardId }: skill_jian_di_feng_xing_c_toc) {
    const player = gameData.playerList[playerId];
    const messagePlayer = gameData.playerList[gameData.messagePlayerId];
    const gameLog = gameData.gameLog;

    if (enable) {
      const oldMessage = messagePlayer.removeMessage(oldMessageCardId);
      const message = gameData.playerRemoveHandCard(player, card);
      messagePlayer.addMessage(message);

      GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player: messagePlayer, messageList: [oldMessage] });

      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: messagePlayer,
        message: message,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
            messagePlayer,
          )}的情报区`,
        ),
      );
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
