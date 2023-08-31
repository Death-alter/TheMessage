import { Card } from "../../Components/Card/Card";
import { CardDirection, CardType } from "../../Components/Card/type";
import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStepHandler } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";

const list: { [key in PlayerActionStepName]: (gui: GameManager) => PlayerActionStepHandler } = {
  [PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const { tooltipText, filter } = initial;
      gui.tooltip.setText(tooltipText);
      gui.tooltip.buttons.setButtons([]);
      gui.gameLayer.startSelectHandCards({
        num: 1,
        filter: filter || ((card) => gui.uiLayer.getCardUsableStatus(card)),
        onSelect: (card: Card) => {
          const canPlay = card.canPlay(gui);
          if (canPlay) {
            gui.tooltip.setText(`是否使用【${card.name}】`);
          } else {
            gui.tooltip.setText(`现在不能使用【${card.name}】`);
          }

          gui.tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                gui.gameLayer.pauseSelectHandCards();
                card.onPlay(gui);
                next();
              },
              enabled: canPlay,
            },
          ]);
        },
        onDeselect: (card: Card) => {
          gui.tooltip.setText(tooltipText);
          gui.tooltip.buttons.setButtons([]);
        },
      });
    },
  [PlayerActionStepName.SELECT_HAND_CARD_TO_SEND]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const { tooltipText, filter } = initial;
      gui.tooltip.setText(tooltipText);
      gui.tooltip.buttons.setButtons([]);
      gui.gameLayer.startSelectHandCards({
        num: 1,
        filter,
        onSelect: (card: Card) => {
          gui.tooltip.setText(`请选择一项操作`);
          gui.tooltip.buttons.setButtons([
            {
              text: "使用卡牌",
              onclick: () => {
                gui.gameLayer.pauseSelectHandCards();
                card.onPlay(gui);
                next();
              },
              enabled: () => gui.uiLayer.cardCanPlayed(card).canPlay,
            },
            {
              text: "传递情报",
              onclick: () => {
                gui.gameLayer.pauseSelectHandCards();
                gui.uiLayer.doSendMessage(card);
                next();
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
  [PlayerActionStepName.SELECT_PLAYERS]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      console.log(initial);
      const { tooltipText, filter, enabled } = initial;
      const num = initial.num != null ? initial.num : 1;
      gui.tooltip.setText(tooltipText || "请选择一名角色");
      gui.gameLayer.startSelectPlayers({
        num,
        filter,
      });
      gui.tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            gui.gameLayer.pauseSelectPlayers();
            next({ players: [...gui.selectedPlayers.list] });
          },
          enabled: enabled != null ? enabled : () => gui.selectedPlayers.list.length === num,
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
  [PlayerActionStepName.SELECT_HAND_CARDS]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const { tooltipText, filter, enabled } = initial;
      const num = initial.num != null ? initial.num : 1;
      gui.tooltip.setText(tooltipText || "请选择一张牌");
      gui.gameLayer.startSelectHandCards({
        num,
        filter,
      });
      gui.tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            gui.gameLayer.pauseSelectHandCards();
            next({ players: [...gui.selectedHandCards.list] });
          },
          enabled: enabled != null ? enabled : () => gui.selectedHandCards.list.length === num,
        },
        {
          text: "取消",
          onclick: () => {
            gui.gameLayer.stopSelectHandCards();
            prev();
          },
        },
      ]);
    },
  [PlayerActionStepName.SELECT_PLAYER_MESSAGE]:
    (gui: GameManager) =>
    ({ initial, current }, { next, prev }) => {
      const player = gui.data.playerList[current.playerId != null ? current.playerId : initial.playerId];
      const { enabled, title } = initial;
      const limit = initial.limit || 1;
      const showCardsWindow = gui.showCardsWindow;

      showCardsWindow.show({
        title: title || "请选择一张情报",
        cardList: player.getMessagesCopy(),
        limit: limit || 1,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              const cardId = showCardsWindow.selectedCards.list[0].id;
              showCardsWindow.hide();
              next({ cardId });
            },
            enabled: enabled != null ? enabled : true,
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
  [PlayerActionStepName.SELECT_MESSAGE_TARGET]:
    (gui: GameManager) =>
    ({ initial, current }, { next, prev, passOnPrev }) => {
      const direction = current.direction != null ? current.direction : initial.direction;
      let i;
      switch (direction) {
        case CardDirection.LEFT:
          passOnPrev(() => {
            i = gui.data.playerList.length - 1;
            while (!gui.data.playerList[i].isAlive) {
              --i;
            }
            next({
              targetPlayerId: i,
            });
          });
          break;
        case CardDirection.RIGHT:
          passOnPrev(() => {
            i = 1;
            while (!gui.data.playerList[i].isAlive) {
              ++i;
            }
            next({
              targetPlayerId: i,
            });
          });
          break;
        case CardDirection.UP:
          gui.gameLayer.startSelectPlayers({
            num: 1,
            filter: (player) => {
              return player.id !== 0;
            },
          });
          gui.tooltip.setText("请选择要传递情报的目标");
          const buttons: any = [
            {
              text: "确定",
              onclick: () => {
                gui.gameLayer.pauseSelectPlayers();
                next({
                  targetPlayerId: gui.selectedPlayers.list[0].id,
                });
              },
              enabled: () => gui.selectedPlayers.list.length > 0,
            },
          ];
          if (initial.canCancel || current.index !== 0) {
            buttons.push({
              text: "取消",
              onclick: () => {
                gui.gameLayer.stopSelectPlayers();
                prev();
              },
            });
          }
          gui.tooltip.buttons.setButtons(buttons);
          break;
      }
    },
  [PlayerActionStepName.SELECT_LOCK_TARGET]:
    (gui: GameManager) =>
    ({ initial, current }, { next, prev }) => {
      gui.tooltip.setText("请选择一名角色锁定");
      gui.gameLayer.startSelectPlayers({
        num: 1,
        filter: (player) => {
          return player.id !== 0;
        },
      });
      const buttons = [
        {
          text: "锁定",
          onclick: () => {
            next({
              lockPlayerId: [gui.selectedPlayers.list[0].id],
            });
          },
          enabled: () => {
            return gui.selectedPlayers.list.length === 1;
          },
        },
        {
          text: "不锁定",
          onclick: () => {
            next();
          },
        },
      ];

      if (initial.canCancel || current.index !== 0) {
        buttons.push({
          text: "取消",
          onclick: () => {
            prev();
          },
        });
      }
      gui.tooltip.buttons.setButtons(buttons);
    },
  [PlayerActionStepName.CONFIRM_USE_SKILL]:
    (gui: GameManager) =>
    ({ initial }, { next, prev }) => {
      const tooltip = gui.tooltip;
      const { tooltipText, enabled } = initial;

      tooltip.setText(tooltipText);
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            next();
          },
          enabled: enabled != null ? () => enabled(gui) : true,
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
