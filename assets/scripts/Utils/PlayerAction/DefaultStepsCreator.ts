import { Card } from "../../Components/Card/Card";
import { CardDirection, CardType } from "../../Components/Card/type";
import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStep, PlayerActionStepHandler } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";

const list: { [key in PlayerActionStepName]: (gui: GameManager) => PlayerActionStepHandler } = {
  [PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      gui.tooltip.setText(initial.tooltipText);
      gui.tooltip.buttons.setButtons([]);
      gui.gameLayer.startSelectHandCards({
        num: 1,
        filter: (card) => gui.uiLayer.getCardUsableStatus(card),
        onSelect: (card: Card) => {
          gui.tooltip.setText(`是否使用【${card.name}】`);
          gui.tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next({ card });
              },
            },
          ]);
        },
        onDeselect: (card: Card) => {
          gui.tooltip.setText(initial.tooltipText);
          gui.tooltip.buttons.setButtons([]);
        },
      });
    },
  [PlayerActionStepName.SELECT_HAND_CARD_TO_SEND]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const { tooltipText } = initial;
      gui.tooltip.setText(tooltipText);
      gui.tooltip.buttons.setButtons([]);
      gui.gameLayer.startSelectHandCards({
        num: 1,
        onSelect: (card: Card) => {
          gui.tooltip.setText(`请选择一项操作`);
          gui.tooltip.buttons.setButtons([
            {
              text: "使用卡牌",
              onclick: () => {
                next({ card });
              },
              enabled: () => gui.uiLayer.cardCanPlayed(card).canPlay,
            },
            {
              text: "传递情报",
              onclick: () => {
                next({ message: card });
              },
            },
          ]);
        },
        onDeselect: (card: Card) => {
          gui.tooltip.setText(tooltipText);
          gui.tooltip.buttons.setButtons([]);
        },
      });
    },
  [PlayerActionStepName.SELECT_RECEIVE_MESSAGE_OR_NOT]:
    (gui: GameManager) =>
    (data, { next, prev }) => {
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
            next({ receive: true });
          },
        },
        {
          text: "不接收",
          onclick: () => {
            next({ receive: false });
          },
          enabled: !(gui.data.lockedPlayer && gui.data.lockedPlayer.id === 0) && gui.data.senderId !== 0,
        },
      ]);
    },
  [PlayerActionStepName.SELECT_SAVE_DIE_OR_NOT]:
    (gui: GameManager) =>
    ({ initial, current }, { next, prev }) => {
      const player = gui.data.playerList[initial.playerId];
      const gameLog = gui.data.gameLog;

      gui.tooltip.setText(`${gameLog.formatPlayer(player)}濒死，是否使用澄清？`);
      gui.gameLayer.startSelectHandCards({ num: 1 });
      gui.tooltip.buttons.setButtons([
        {
          text: "澄清",
          onclick: () => {
            next({
              card: gui.selectedHandCards.list[0],
            });
          },
          enabled: () =>
            gui.selectedHandCards.list[0] &&
            gui.selectedHandCards.list[0].type === CardType.CHENG_QING &&
            gui.data.bannedCardTypes.indexOf(CardType.CHENG_QING) === -1,
        },
        {
          text: "取消",
          onclick: () => {
            prev();
          },
        },
      ]);
    },
  [PlayerActionStepName.SELECT_DIE_GIVE_CARDS]:
    (gui: GameManager) =>
    (data, { next, prev }) => {
      gui.tooltip.setText("你已死亡，请选择最多三张手牌交给其他角色");
      gui.gameLayer.startSelectHandCards({ num: 3 });
      gui.gameLayer.startSelectPlayers({
        num: 1,
        filter: (player) => player.id !== 0,
      });
      gui.tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            next({
              targetPlayer: gui.selectedPlayers.list[0],
              cards: [...gui.selectedHandCards.list],
            });
          },
          enabled: () => gui.selectedHandCards.list.length > 0 && gui.selectedPlayers.list.length > 0,
        },
        {
          text: "取消",
          onclick: () => {
            prev();
          },
        },
      ]);
    },
  [PlayerActionStepName.SELECT_PLAYER]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const { tooltipText, num, filter, enabled } = initial;
      gui.tooltip.setText(tooltipText || "请选择一名角色");
      gui.gameLayer.startSelectPlayers({
        num: num || 1,
        filter,
      });
      gui.tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            gui.gameLayer.pauseSelectPlayers();
            next({ selectedPlayers: [...gui.selectedPlayers.list] });
          },
          enabled: enabled || true,
        },
        {
          text: "取消",
          onclick: () => {
            gui.gameLayer.stopSelectPlayers();
            prev();
          },
        },
      ]);
    },
  [PlayerActionStepName.SELECT_PLAYER_MESSAGE]:
    (gui: GameManager) =>
    ({ initial, current }, { next, prev }) => {
      const player = gui.data.playerList[current.playerId];
      const showCardsWindow = gui.showCardsWindow;

      showCardsWindow.show({
        title: initial.title,
        cardList: player.getMessagesCopy(),
        limit: initial.limit,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              next({ cardId: showCardsWindow.selectedCards.list[0].id });
              showCardsWindow.hide();
            },
          },
          {
            text: "取消",
            onclick: () => {
              prev();
              showCardsWindow.hide();
            },
          },
        ],
      });
    },
};

export default list;
