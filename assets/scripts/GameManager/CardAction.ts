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

export interface CardActionItem {
  node: Node;
  action: Tween<Node>;
}

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;

  public transmissionMessageObject: CardObject;
  public actions: { [index: string]: Tween<Node> } = {};
  public handCardList: HandCardList;

  public items: { [index: string]: CardActionItem } = {};

  private getLocation(location: CardActionLocation, player?: Player) {
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
    if (this.node.active) {
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
  }

  moveNode({ node, from, to, duration = 0.6 }: MoveNodeParams) {
    return new Promise((resolve, reject) => {
      if (from && this.actions[node.uuid]) {
        node.worldPosition = this.getLocation(from.location, from.player);
      }
      this.setAction(
        node,
        tween(node)
          .to(duration, { worldPosition: to.position || this.getLocation(to.location, to.player) })
          .call(() => {
            resolve(null);
          })
      );
    });
  }

  addCardNode(card: Card, loaction?: ActionLocation);
  addCardNode(cards: Card[], loaction?: ActionLocation);
  addCardNode(card: Card | Card[], loaction?: ActionLocation) {
    let node;
    if (card instanceof Array) {
      const cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      for (let c of card) {
        if (!c.gameObject) {
          c.gameObject = GamePools.cardPool.get();
        }
        c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(c);
      }
      node = cardGroup.gameObject.node;
    } else {
      if (!card.gameObject) {
        card.gameObject = GamePools.cardPool.get();
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      }
      node = card.gameObject.node;
    }
    if (loaction) {
      node.position = this.getLocation(loaction.location, loaction.player);
    }
  }

  removeCardNode(node: Node) {
    
  }

  setCard(card: Card, loaction: ActionLocation) {
    if (!card.gameObject) {
      card.gameObject = GamePools.cardPool.get();
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    }
    card.gameObject.node.position = this.getLocation(loaction.location, loaction.player);
  }

  addCardToHandCard({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToHandCard({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToHandCard(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
    const { player, cards, from, card } = data;
    return new Promise((resolve, reject) => {
      let cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      if (card) {
        if (!card.gameObject) {
          card.gameObject = GamePools.cardPool.get();
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
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
            this.handCardList.addData(card);
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

  addCardToMessageZone({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToMessageZone({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToMessageZone(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
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
        to: { location: CardActionLocation.PLAYER, player },
      }).then(() => {
        this.setAction(
          cardGroup.gameObject.node,
          tween(cardGroup.gameObject.node)
            .to(0.5, {
              worldPosition: this.getLocation(CardActionLocation.PLAYER_MESSAGE_ZONE, player),
              scale: new Vec3(0, 0, 1),
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
    });
  }

  moveCard({ card, from, to }: { card: Card; from?: ActionLocation; to: ActionLocation }) {
    return new Promise((resolve, reject) => {
      if (!card.gameObject) {
        card.gameObject = GamePools.cardPool.get();
      }
      this.node.addChild(card.gameObject.node);
      this.moveNode({
        node: card.gameObject.node,
        from,
        to,
      }).then(() => {
        resolve(null);
      });
    });
  }

  showDeckTopCard(card: Card) {
    if (!card.gameObject) {
      card.gameObject = GamePools.cardPool.get();
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    }
    this.node.addChild(card.gameObject.node);
    card.gameObject.node.worldPosition = this.getLocation(CardActionLocation.DECK);
  }

  //抽牌动画
  drawCards({ player, cardList }: GameEventType.PlayerDrawCard) {
    return this.addCardToHandCard({
      player,
      cards: cardList,
      from: { location: CardActionLocation.DECK },
    });
  }

  //弃牌动画
  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          this.handCardList.removeData(card);
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
  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    const { card, player } = data;

    if (player.id === 0) {
      this.handCardList.removeData(card);
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

  giveCards({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          this.handCardList.removeData(card);
        });
      }
      this.addCardToHandCard({
        player: targetPlayer,
        cards: cardList,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        resolve(null);
      });
    });
  }

  playerSendMessage({ player, message, targetPlayer }: GameEventType.PlayerSendMessage) {
    return new Promise(async (resolve, reject) => {
      const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
      const targetPanting = targetPlayer.gameObject.node.getChildByPath("Border/CharacterPanting");
      if (player.id === 0) {
        this.handCardList.removeData(message);
      }

      if (!message.gameObject) {
        message.gameObject = GamePools.cardPool.get();
      }

      message.gameObject.node.setParent(this.node);
      message.gameObject.node.worldPosition = panting.worldPosition;
      this.transmissionMessageObject = message.gameObject;

      if (player.id === 0) {
        message.status = CardStatus.FACE_DOWN;
      }
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
    return new Promise((resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      const messageContainer = player.gameObject.node.getChildByPath("Border/Message");
      if (message.status === CardStatus.FACE_DOWN) {
        message.flip().then(() => {
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
        });
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
        // message.gameObject.node.worldPosition = this.getLocation(CardActionLocation.DECK);
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
            worldPosition: this.getLocation(CardActionLocation.PLAYER_MESSAGE_ZONE, player),
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

  discardMessage(message) {
    return new Promise(async (resolve, reject) => {
      await message.flip();
      await this.moveNode({
        node: message.gameObject.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: 0.3,
      });
      GamePools.cardPool.put(message.gameObject);
      message.gameObject = null;
      resolve(null);
    });
  }

  replaceMessage({ message, oldMessage }: GameEventType.MessageReplaced) {
    return new Promise(async (resolve, reject) => {
      this.transmissionMessageObject = message.gameObject;
      const worldPosition = new Vec3(oldMessage.gameObject.node.worldPosition);
      await this.discardMessage(oldMessage);
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
