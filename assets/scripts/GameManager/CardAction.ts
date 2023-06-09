import { _decorator, Component, tween, Node, Vec3, Tween } from "cc";
import { Card } from "../Game/Card/Card";
import { DataContainer } from "../Game/Container/DataContainer";
import { CardStatus } from "../Game/Card/type";
import GamePools from "./GamePools";
import * as GameEventType from "../Event/GameEventType";
import { CardObject } from "../Game/Card/CardObject";
import { HandCardList } from "../Game/Container/HandCardList";
import { Player } from "../Game/Player/Player";
import { ActionLocation, CardActionLocation, MoveNodeParams } from "./type";

const { ccclass, property } = _decorator;

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;

  public transmissionMessageObject: CardObject;
  public actions: { [index: string]: Tween<Node> } = {};
  public actionQueue: Tween<Node>[] = [];

  private getLoaction(location: CardActionLocation, player?: Player) {
    switch (location) {
      case CardActionLocation.DECK:
        return this.deckNode.worldPosition;
      case CardActionLocation.DISCARD_PILE:
        return this.discardPileNode.worldPosition;
      case CardActionLocation.PLAYER:
        return (
          player && player.gameObject && player.gameObject.node.getChildByPath("Border/CharacterPanting").worldPosition
        );
      case CardActionLocation.PLAYER_HAND_CARD:
        return player && player.gameObject && player.gameObject.node.worldPosition;
      case CardActionLocation.PLAYER_MESSAGE_ZONE:
        return player && player.gameObject && player.gameObject.node.getChildByPath("Border/Message").worldPosition;
      default:
        return this.node.worldPosition;
    }
  }

  setAction(node: Node, t: Tween<Node>) {
    const action = this.actions[node.uuid];
    if (action) {
      action.then(t).start();
    } else {
      t.call(() => {
        delete this.actions[node.uuid];
      }).start();
      this.actions[node.uuid] = t;
    }
  }

  moveNode({ node, from, to, duration = 0.6 }: MoveNodeParams) {
    return new Promise((resolve, reject) => {
      if (from) {
        node.worldPosition = this.getLoaction(from.location, from.player);
      }
      this.setAction(
        node,
        tween(node)
          .to(duration, { worldPosition: to.position || this.getLoaction(to.location, to.player) })
          .call(() => {
            resolve(null);
          })
      );
    });
  }

  addCardToHandCard(
    { player, card, from }: { player: Player; card: Card; from?: ActionLocation },
    handCardList: HandCardList
  );
  addCardToHandCard(
    { player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation },
    handCardList: HandCardList
  );
  addCardToHandCard(
    data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation },
    handCardList: HandCardList
  ) {
    const { player, cards, from, card } = data;
    return new Promise((resolve, reject) => {
      let cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      if (card) {
        if (!card.gameObject) {
          card.gameObject = GamePools.cardPool.get();
        }
        cardGroup.addData(card);
      } else {
        for (let card of cards) {
          card.gameObject = GamePools.cardPool.get();
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          cardGroup.addData(card);
        }
      }
      this.node.addChild(cardGroup.gameObject.node);
      this.moveNode({
        node: cardGroup.gameObject.node,
        from,
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        for (let card of cardGroup.list) {
          if (player.id === 0) {
            card.gameObject.node.scale = new Vec3(1, 1, 1);
            handCardList.addData(card);
          } else {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
        }
        cardGroup.removeAllData();
        GamePools.cardGroupPool.put(cardGroup.gameObject);
        cardGroup.gameObject = null;
        resolve(null);
      });
    });
  }

  //抽牌动画
  drawCards({ player, cardList }: GameEventType.PlayerDrawCard, handCardList: HandCardList) {
    return this.addCardToHandCard(
      {
        player,
        cards: cardList,
        from: { location: CardActionLocation.DECK },
      },
      handCardList
    );
  }

  //弃牌动画
  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard, handCardList: HandCardList) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          handCardList.removeData(card);
          card.gameObject.node.setParent(this.node);
          this.setAction(
            card.gameObject.node,
            tween(card.gameObject.node)
              .to(0.6, {
                scale: new Vec3(0.6, 0.6, 1),
                worldPosition: this.discardPileNode.worldPosition,
              })
              .call(() => {
                GamePools.cardPool.put(card.gameObject);
                card.gameObject = null;
              })
          );
        });
      } else {
        const cardGroup = new DataContainer<Card>();
        cardGroup.gameObject = GamePools.cardGroupPool.get();
        cardList.forEach((card) => {
          if (!card.gameObject) {
            card.gameObject = GamePools.cardPool.get();
          }
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          cardGroup.addData(card);
        });
        this.node.addChild(cardGroup.gameObject.node);
        cardGroup.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
        this.moveNode({
          node: cardGroup.gameObject.node,
          to: { location: CardActionLocation.DISCARD_PILE },
          duration: 0.6,
        }).then(() => {
          for (let card of cardGroup.list) {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
          cardGroup.removeAllData();
          GamePools.cardGroupPool.put(cardGroup.gameObject);
          cardGroup.gameObject = null;
          resolve(null);
        });
      }
    });
  }

  //打出卡牌动画，播放声音
  playerPlayCard(data: GameEventType.PlayerPlayCard, handCardList: HandCardList) {
    const { card, player } = data;

    if (player.id === 0 && card.id) {
      handCardList.removeData(card);
    }
    if (!card.gameObject) {
      card.gameObject = GamePools.cardPool.get();
    }
    card.gameObject.node.setParent(this.node);
    card.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
    card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    this.setAction(
      card.gameObject.node,
      tween(card.gameObject.node).to(0.6, {
        worldPosition: this.discardPileNode.worldPosition,
      })
    );
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const { card, flag } = data;
    if (!flag) {
      if (card.action) {
        card.action
          .delay(0.5)
          .call(() => {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          })
          .start();
      } else {
        card.gameObject.scheduleOnce(() => {
          GamePools.cardPool.put(card.gameObject);
          card.gameObject = null;
        }, 0.5);
      }
    }
  }

  giveCards({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard, handCardList: HandCardList) {
    return new Promise((resolve, reject) => {
      const cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();

      cardList.forEach((card) => {
        if (player.id === 0) {
          handCardList.removeData(card);
        } else {
          card.gameObject = GamePools.cardPool.get();
        }
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(card);
      });

      this.node.addChild(cardGroup.gameObject.node);
      this.moveNode({
        node: cardGroup.gameObject.node,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
        duration: 0.8,
      }).then(() => {
        for (let card of cardGroup.list) {
          if (targetPlayer.id === 0) {
            card.gameObject.node.scale = new Vec3(1, 1, 1);
            handCardList.addData(card);
          } else {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
        }
        cardGroup.removeAllData();
        GamePools.cardGroupPool.put(cardGroup.gameObject);
        cardGroup.gameObject = null;
        resolve(null);
      });
    });
  }

  playerSendMessage({ player, message, targetPlayer }: GameEventType.PlayerSendMessage, handCardList: HandCardList) {
    return new Promise(async (resolve, reject) => {
      const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
      const targetPanting = targetPlayer.gameObject.node.getChildByPath("Border/CharacterPanting");
      let worldPosition;
      if (player.id === 0) {
        worldPosition = message.gameObject.node.worldPosition;
        handCardList.removeData(message);
      } else {
        message.gameObject = GamePools.cardPool.get();
        worldPosition = panting.worldPosition;
      }

      message.gameObject.node.setParent(this.node);
      message.gameObject.node.worldPosition = worldPosition;
      this.transmissionMessageObject = message.gameObject;

      if (player.id === 0) {
        await message.flip();
        this.setAction(
          message.gameObject.node,
          tween(message.gameObject.node)
            .to(0.3, {
              worldPosition: panting.worldPosition,
              scale: new Vec3(0.6, 0.6, 1),
            })
            .to(0.5, {
              worldPosition: targetPanting.worldPosition,
            })
            .call(() => {
              resolve(null);
            })
        );
      } else {
        message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        this.setAction(
          message.gameObject.node,
          tween(message.gameObject.node)
            .to(0.5, {
              worldPosition: targetPanting.worldPosition,
            })
            .call(() => {
              resolve(null);
            })
        );
      }
    });
  }

  //传递情报动画
  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    return new Promise((resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      const panting = messagePlayer.gameObject.node.getChildByPath("Border/CharacterPanting");
      this.setAction(
        message.gameObject.node,
        tween(message.gameObject.node)
          .to(0.5, {
            worldPosition: panting.worldPosition,
          })
          .call(() => {
            resolve(null);
          })
      );
    });
  }

  //选择接收情报
  chooseReceiveMessage({ player, message }: GameEventType.PlayerChooseReceiveMessage) {
    this.setAction(
      message.gameObject.node,
      tween(message.gameObject.node)
        .to(0.33, {
          scale: new Vec3(1, 1, 1),
        })
        .to(0.33, {
          scale: new Vec3(0.6, 0.6, 1),
        })
    );
  }

  //接收情报动画
  receiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      const messageContainer = player.gameObject.node.getChildByPath("Border/Message");
      if (message.status === CardStatus.FACE_DOWN) {
        await message.flip();
        this.setAction(
          message.gameObject.node,
          tween(message.gameObject.node)
            .to(0.5, {
              worldPosition: messageContainer.worldPosition,
              scale: new Vec3(0, 0, 1),
            })
            .call(() => {
              GamePools.cardPool.put(message.gameObject);
              message.gameObject = null;
              resolve(null);
            })
        );
      } else {
        this.setAction(
          message.gameObject.node,
          tween(message.gameObject.node)
            .to(0.5, {
              worldPosition: messageContainer.worldPosition,
              scale: new Vec3(0, 0, 1),
            })
            .call(() => {
              GamePools.cardPool.put(message.gameObject);
              message.gameObject = null;
              resolve(null);
            })
        );
      }
    });
  }

  messagePlacedIntoMessageZone({ player, message }: GameEventType.MessagePlacedIntoMessageZone) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = GamePools.cardPool.get();
        message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        // message.gameObject.node.worldPosition = this.getLoaction(CardActionLocation.DECK);
      }
      message.gameObject.node.setParent(this.node);
      await this.moveNode({
        node: message.gameObject.node,
        to: {
          location: CardActionLocation.PLAYER,
          player,
        },
        from: {
          location: CardActionLocation.DECK,
        },
      });
      this.setAction(
        message.gameObject.node,
        tween(message.gameObject.node)
          .to(0.5, {
            worldPosition: this.getLoaction(CardActionLocation.PLAYER_MESSAGE_ZONE, player),
            scale: new Vec3(0, 0, 1),
          })
          .call(() => {
            GamePools.cardPool.put(message.gameObject);
            message.gameObject = null;
            resolve(null);
          })
      );
    });
  }

  replaceMessage({ message, oldMessage }: GameEventType.MessageReplaced) {
    return new Promise(async (resolve, reject) => {
      this.transmissionMessageObject = message.gameObject;
      const worldPosition = new Vec3(oldMessage.gameObject.node.worldPosition);
      await oldMessage.flip();
      await this.moveNode({
        node: oldMessage.gameObject.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: 0.3,
      });
      GamePools.cardPool.put(oldMessage.gameObject);
      oldMessage.gameObject = null;
      await message.flip();
      await this.moveNode({
        node: message.gameObject.node,
        to: { position: worldPosition },
        duration: 0.6,
      });
      resolve(null);
    });
  }

  removeMessage({ player, messageList }: GameEventType.PlayerRemoveMessage) {
    return new Promise((resolve, reject) => {
      const cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");

      messageList.forEach((card) => {
        if (!card.gameObject) {
          card.gameObject = GamePools.cardPool.get();
        }
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(card);
      });

      this.node.addChild(cardGroup.gameObject.node);
      cardGroup.gameObject.node.worldPosition = panting.worldPosition;
      this.setAction(
        cardGroup.gameObject.node,
        tween(cardGroup.gameObject.node)
          .to(0.8, {
            worldPosition: this.discardPileNode.worldPosition,
          })
          .call(() => {
            for (let card of cardGroup.list) {
              GamePools.cardPool.put(card.gameObject);
              card.gameObject = null;
            }
            cardGroup.removeAllData();
            GamePools.cardGroupPool.put(cardGroup.gameObject);
            cardGroup.gameObject = null;
            resolve(null);
          })
      );
    });
  }
}
