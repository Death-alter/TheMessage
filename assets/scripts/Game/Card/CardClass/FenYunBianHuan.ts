import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { CardActionLocation, GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { OuterGlow } from "../../../Utils/OuterGlow";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";

export class FenYunBianHuan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: CardType.FENG_YUN_BIAN_HUAN,
      src: "FengYunBianHuan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    tooltip.setText(`是否使用风云变幻？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.USE_FENG_YUN_BIAN_HUAN_TOS, {
            cardId: this.id,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onShowCards(gameData: GameData, { cards }: CardOnEffectParams) {
    const list = [];
    for (let card of cards) {
      list.push(gameData.createCard(card, CardStatus.FACE_UP));
    }
    if (gameData.gameObject) {
      gameData.gameObject.showCardsWindow.show({
        title: "",
        cardList: list,
        limit: 1,
        buttons: [],
      });
    }
  }

  waitingForChooseCard(gameData: GameData, { playerId }: CardOnEffectParams) {
    if (gameData.gameObject) {
      const player = gameData.playerList[playerId];
      const showCardsWindow = gameData.gameObject.showCardsWindow;
      if (gameData.gameObject) {
        if (playerId !== 0) {
          gameData.gameObject.showCardsWindow.show();
          showCardsWindow.setTitle(`等待${player.seatNumber + 1}号玩家选择一张牌`);
          showCardsWindow.buttons.setButtons([]);
        } else {
          gameData.gameObject.showCardsWindow.setTitle(`请选择一张牌`);
          showCardsWindow.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                const card = gameData.gameObject.showCardsWindow.selectedCards.list[0];
                gameData.gameObject.showCardsWindow.hide();
                const messages = player.getMessagesCopy();
                //flag为情报区是否有同色情报
                let flag = false;
                for (let color of card.color) {
                  if (Card.hasColor(messages, color)) {
                    flag = true;
                    break;
                  }
                }
                if (flag) {
                  NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                    cardId: card.id,
                    asMessageCard: false,
                    seq: gameData.gameObject.seq,
                  });
                } else {
                  const tooltip = gameData.gameObject.tooltip;
                  tooltip.setText(`是否将该牌置入情报区？`);
                  tooltip.buttons.setButtons([
                    {
                      text: "加入手牌",
                      onclick: () => {
                        NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                          cardId: card.id,
                          asMessageCard: false,
                          seq: gameData.gameObject.seq,
                        });
                      },
                    },
                    {
                      text: "置入情报区",
                      onclick: () => {
                        NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                          cardId: card.id,
                          asMessageCard: true,
                          seq: gameData.gameObject.seq,
                        });
                      },
                    },
                  ]);
                }
              },
              enabled: () => {
                return !!gameData.gameObject.showCardsWindow.selectedCards.list.length;
              },
            },
          ]);
        }
      }
    }
  }

  onChooseCard(gameData: GameData, { playerId, cardId, asMessageCard }: CardOnEffectParams) {
    if (gameData.gameObject) {
      const player = gameData.playerList[playerId];
      const cardList = gameData.gameObject.showCardsWindow.cardList.list;
      for (let card of cardList) {
        if (card.id === cardId) {
          card.gameObject.node?.getComponentInChildren(OuterGlow).closeOuterGlow();
          gameData.gameObject.showCardsWindow.removeCard(card);
          if (asMessageCard) {
            player.addMessage(card);
            GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
              player,
              message: card,
            });
          } else {
            gameData.playerAddHandCard(player, card);

            GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
              player,
              card,
              from: CardActionLocation.DECK,
            });
          }
          break;
        }
      }
    }
  }

  onFinish(gameData: GameData) {
    gameData.gameObject?.showCardsWindow.hide();
  }
}
