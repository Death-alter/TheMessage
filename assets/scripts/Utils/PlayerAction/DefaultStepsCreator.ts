import { Card } from "../../Components/Card/Card";
import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStep } from "./PlayerActionStep";

export default {
  setMainPhaseTooltip: (gui: GameManager) => (next, prev, pass) => {
    gui.tooltip.setNextPhaseButtonText("传递阶段");
    gui.tooltip.showNextPhaseButton();
    gui.tooltip.setText("出牌阶段，请选择要使用的卡牌");
    gui.tooltip.buttons.setButtons([]);
    pass?.();
  },
  setFightPhaseTooltip: (gui: GameManager) => (next, prev, pass) => {
    gui.tooltip.setNextPhaseButtonText("跳过");
    gui.tooltip.showNextPhaseButton();
    gui.tooltip.setText("争夺阶段，请选择要使用的卡牌");
    gui.tooltip.buttons.setButtons([]);
    pass?.();
  },
  selectHandCardToPlay: (gui: GameManager) => (next, prev, pass) => {
    gui.gameLayer.startSelectHandCards({
      num: 1,
      onSelect: (card: Card) => {
        const flag = gui.uiLayer.cardCanPlayed(card);
        if (flag.canPlay) {
          next("playCard");
        } else {
          if (flag.banned) {
            gui.tooltip.setText("这张卡被禁用了");
          } else {
            gui.tooltip.setText("现在不能使用这张卡");
          }
        }
      },
      onDeselect: (card: Card) => {
        prev();
      },
    });
  },
};

const a = {
  setMainPhaseTooltip: {
    selectHandCardToPlay: {
      playChengQing: "USE_CHENG_QING",
    },
  },
};

const b = {
  setSendPhaseTooltip: {
    selectHandCardToSend: {
      sendMessage: "SEND_MESSAGE",
    },
    selectHandCardToPlay: {
      playMiLing: "USE_MI_LING",
    },
  },
};

const c = {
  step: "setSendPhaseTooltip",
  next: [
    {
      step: "selectHandCardToSend",
      next: () => {},
    },
    {
      step: "selectHandCardToPlay",
    },
  ],
};
