import { Card } from "../../Components/Card/Card";
import { CardDirection, CardType } from "../../Components/Card/type";
import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStepHandler } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";

const list: { [key in PlayerActionStepName]: (gui: GameManager) => PlayerActionStepHandler } = {
  [PlayerActionStepName.SET_MAIN_PHASE_TOOLTIP]:
    (gui: GameManager) =>
    (data, { next }) => {
      const f = () => {
        gui.tooltip.setNextPhaseButtonText("出牌阶段");
        gui.tooltip.showNextPhaseButton();
        gui.tooltip.setText("出牌阶段，请选择要使用的卡牌");
        gui.tooltip.buttons.setButtons([]);
      };
      f();
      next(0, f);
    },
  [PlayerActionStepName.SET_FIGHT_PHASE_TOOLTIP]:
    (gui: GameManager) =>
    (data, { next }) => {
      const f = () => {
        gui.tooltip.setNextPhaseButtonText("跳过");
        gui.tooltip.showNextPhaseButton();
        gui.tooltip.setText("争夺阶段，请选择要使用的卡牌");
        gui.tooltip.buttons.setButtons([]);
      };
      f();
      next(0, f);
    },
  [PlayerActionStepName.SET_SEND_MESSAGE_TOOLTIP]:
    (gui: GameManager) =>
    (data, { next }) => {
      const f = () => {
        gui.tooltip.setText("传递阶段，请选择要传递的情报或要使用的卡牌");
        gui.tooltip.buttons.setButtons([]);
      };
      f();
      next(0, f);
    },
  [PlayerActionStepName.SET_RECEIVE_MESSAGE_TOOLTIP]:
    (gui: GameManager) =>
    (data, { next }) => {
      let text = "";
      switch (gui.data.messageDirection) {
        case CardDirection.UP:
          text = "上";
          break;
        case CardDirection.LEFT:
          text = "左";
          break;
        case CardDirection.RIGHT:
          text = "右";
          break;
      }
      gui.tooltip.setText(`情报传递到你面前，方向向${text}，是否接收情报？`);
      gui.tooltip.buttons.setButtons([
        {
          text: "接收情报",
          onclick: () => {
            next(0, true);
          },
        },
        {
          text: "不接收",
          onclick: () => {
            next(0, false);
          },
          enabled: !(gui.data.lockedPlayer && gui.data.lockedPlayer.id === 0) && gui.data.senderId !== 0,
        },
      ]);
    },

  [PlayerActionStepName.SET_PLAYER_DYING_TOOLTIP]:
    (gui: GameManager) =>
    (playerId, { next, prev }) => {
      const player = gui.data.playerList[playerId];
      const gameLog = gui.data.gameLog;

      gui.tooltip.setText(`${gameLog.formatPlayer(player)}濒死，是否使用澄清？`);
      gui.gameLayer.startSelectHandCards({ num: 1 });
      gui.tooltip.buttons.setButtons([
        {
          text: "澄清",
          onclick: () => {
            next?.(0);
          },
          enabled: () =>
            gui.selectedHandCards.list[0] &&
            gui.selectedHandCards.list[0].type === CardType.CHENG_QING &&
            gui.data.bannedCardTypes.indexOf(CardType.CHENG_QING) === -1,
        },
        {
          text: "取消",
          onclick: () => {
            next(1);
          },
        },
      ]);
    },

  [PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY]:
    (gui: GameManager) =>
    (f, { next, prev }) => {
      gui.gameLayer.startSelectHandCards({
        num: 1,
        filter: (card) => gui.uiLayer.getCardUsableStatus(card),
        onSelect: (card: Card) => {
          gui.tooltip.setText(`是否使用【${card.name}】`);
          gui.tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next(0, card);
              },
            },
          ]);
        },
        onDeselect: (card: Card) => {
          f();
        },
      });
    },
  [PlayerActionStepName.SELECT_HAND_CARD_TO_SEND]:
    (gui: GameManager) =>
    (f, { next, prev }) => {
      gui.gameLayer.startSelectHandCards({
        num: 1,
        onSelect: (card: Card) => {
          gui.tooltip.setText(`请选择一项操作`);
          gui.tooltip.buttons.setButtons([
            {
              text: "使用卡牌",
              onclick: () => {
                next(0, card);
              },
              enabled: () => gui.uiLayer.cardCanPlayed(card).canPlay,
            },
            {
              text: "传递情报",
              onclick: () => {
                next(1, card);
              },
            },
          ]);
        },
        onDeselect: (card: Card) => {
          f();
        },
      });
    },

  [PlayerActionStepName.SELECT_PLAYER]:
    (gui: GameManager) =>
    (data, { next, prev }) => {
      gui.gameLayer.startSelectPlayers({
        num: data.num,
        filter: data.filter,
      });
    },
  [PlayerActionStepName.DO_PLAY_CARD]:
    (gui: GameManager) =>
    (card: Card, { next, prev }) => {
      card.onSelectedToPlay(gui);
      next();
    },
  [PlayerActionStepName.DO_SEND_MESSAGE]:
    (gui: GameManager) =>
    (data, { next, prev }) => {
      gui.uiLayer.doSendMessage();
      next();
    },

  [PlayerActionStepName.SELECT_HAND_CARD]:
    (gui: GameManager) =>
    (data, { next, repeat }) => {
      gui.gameLayer.startSelectHandCards({
        num: data.number,
        onSelect: (card: Card) => {
          next(0, card);
        },
        onDeselect: (card: Card) => {
          gui.uiLayer.clearUIState();
          repeat();
        },
      });
    },
  [PlayerActionStepName.SELECT_HAND_CARD_AND_CONFIRM]:
    (gui: GameManager) =>
    (data, { next, prev }) => {
      gui.gameLayer.startSelectHandCards({
        num: data.number,
      });
      gui.tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            next(0, data);
          },
          enabled: data.enabled || true,
        },
        {
          text: "取消",
          onclick: () => {
            prev();
          },
        },
      ]);
    },
};

export default list;
