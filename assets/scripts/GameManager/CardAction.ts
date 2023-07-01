import { _decorator, Component, tween, Node, Vec3, Tween, UITransform, Vec2 } from "cc";
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
  data: Card | DataContainer<Card>;
  action?: Tween<any>;
}

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  line: Node | null = null;

  public transmissionMessageObject: CardObject;
  public items: { [index: string]: CardActionItem } = {};
  public handCardList: HandCardList;

  onLoad() {
    this.items[this.line.uuid] = { node: this.line, data: null };
  }

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

  private getActionItem(node: Node) {
    return this.items[node.uuid];
  }

  private setAction(node: Node, t: Tween<any>, mixin?: boolean) {
    if (mixin !== false) mixin = true;
    if (this.node.active && node) {
      const action = this.items[node.uuid] && this.items[node.uuid].action;
      if (action) {
        if (mixin) {
          tween(node)
            .parallel(action, t)
            .call(() => {
              if (this.items[node.uuid]) this.items[node.uuid].action = null;
            })
            .start();
        } else {
          action
            .call(() => {
              t.call(() => {
                if (this.items[node.uuid]) this.items[node.uuid].action = null;
              }).start();
            })
            .start();
        }
      } else {
        this.items[node.uuid].action = t;
        t.call(() => {
          if (this.items[node.uuid]) this.items[node.uuid].action = null;
        }).start();
      }
    }
  }

  private moveNode({ node, from, to, duration = 0.6 }: MoveNodeParams) {
    return new Promise((resolve, reject) => {
      if (!this.getActionItem(node)) reject(null);
      if (from && !this.items[node.uuid]) {
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

  private scaleNode({ node, scale, duration = 0.6 }: { node: Node; scale: Vec3; duration?: number }) {
    return new Promise((resolve, reject) => {
      if (!this.getActionItem(node)) reject(null);
      this.setAction(
        node,
        tween(node)
          .to(duration, { scale })
          .call(() => {
            resolve(null);
          })
      );
    });
  }

  private addCard(card: Card, loaction?: ActionLocation): Node;
  private addCard(cards: Card[], loaction?: ActionLocation): Node;
  private addCard(card: Card | Card[], loaction?: ActionLocation): Node {
    let node;
    const obj: any = {};
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
      obj.data = cardGroup;
    } else {
      if (!card.gameObject) {
        card.gameObject = GamePools.cardPool.get();
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      }
      node = card.gameObject.node;
      obj.data = card;
    }
    this.node.addChild(node);
    if (loaction) {
      node.worldPosition = this.getLocation(loaction.location, loaction.player);
    }
    obj.node = node;
    this.items[node.uuid] = obj;
    return node;
  }

  private removeCardNode(node: Node) {
    const item = this.items[node.uuid];
    if (item) {
      item.action?.stop();
      this.node.removeChild(item.node);
      if (item.data instanceof Card) {
        GamePools.cardPool.put(item.data.gameObject);
      } else {
        for (let card of item.data.list) {
          GamePools.cardPool.put(card.gameObject);
          card.gameObject = null;
        }
        item.data.removeAllData();
        GamePools.cardGroupPool.put(item.data.gameObject);
      }
      item.data.gameObject = null;
      delete this.items[node.uuid];
    }
  }

  showIndicantLine({ from, to, duration = 0.6 }: { from: ActionLocation; to: ActionLocation; duration?: number }) {
    const fromPosition = this.getLocation(from.location, from.player);
    const toPosition = this.getLocation(to.location, to.player);
    const dx = toPosition.x - fromPosition.x;
    const dy = toPosition.y - fromPosition.y;

    this.line.worldPosition = fromPosition;
    const transform = this.line.getComponent(UITransform);
    transform.width = 0;
    const dir = new Vec2(dx, -dy);
    const degree = (dir.signAngle(new Vec2(1, 0)) / Math.PI) * 180;
    this.line.angle = degree;
    this.line.active = true;
    this.setAction(
      this.line,
      tween(transform)
        .to(duration, { width: Math.sqrt(dx * dx + dy * dy) })
        .delay(1)
        .call(() => {
          this.line.active = false;
        }),
      false
    );
  }

  setCard(card: Card, loaction: ActionLocation) {
    this.addCard(card, loaction);
  }

  addCardToHandCard({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToHandCard({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToHandCard(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
    const { player, from } = data;
    const card = data.card || data.cards;
    let node;
    return new Promise((resolve, reject) => {
      if (from && from.player && from.player.id === 0) {
        if (card instanceof Array) {
          for (let c of card) {
            this.handCardList.removeData(c);
            c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          }
        } else {
          this.handCardList.removeData(card);
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        }
      }
      node = this.addCard(<Card>card, from);
      this.moveNode({
        node,
        from,
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        if (player.id === 0) {
          if (card instanceof Array) {
            for (let c of card) {
              c.gameObject.node.scale = new Vec3(1, 1, 1);
              this.handCardList.addData(c);
            }
          } else {
            card.gameObject.node.scale = new Vec3(1, 1, 1);
            this.handCardList.addData(card);
          }
        } else {
          this.removeCardNode(node);
        }
        resolve(null);
      });
    });
  }

  addCardToMessageZone({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToMessageZone({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToMessageZone(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
    const { player, from } = data;
    const card = data.card || data.cards;
    let node;
    return new Promise((resolve, reject) => {
      if (from && from.player && from.player.id === 0) {
        if (card instanceof Array) {
          for (let c of card) {
            this.handCardList.removeData(c);
            c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          }
        } else {
          this.handCardList.removeData(card);
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        }
      }
      node = this.addCard(<Card>card, from);
      this.moveNode({
        node,
        from,
        to: { location: CardActionLocation.PLAYER, player },
      }).then(() => {
        this.moveNode({
          node,
          to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
        });
        this.scaleNode({
          node,
          scale: new Vec3(0, 0, 1),
        }).then(() => {
          this.removeCardNode(node);
          resolve(null);
        });
      });
    });
  }

  moveCard({ card, from, to }: { card: Card; from?: ActionLocation; to: ActionLocation }) {
    return new Promise((resolve, reject) => {
      const node = this.addCard(<Card>card, from);
      this.moveNode({
        node,
        from,
        to,
      }).then(() => {
        resolve(null);
      });
    });
  }

  showDeckTopCard(card: Card) {
    this.addCard(card, { location: CardActionLocation.DECK });
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
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          const node = this.addCard(card);
          this.moveNode({
            node,
            to: { location: CardActionLocation.DISCARD_PILE },
          }).then(() => {
            this.removeCardNode(node);
            resolve(null);
          });
        });
      } else {
        const node = this.addCard(cardList, { location: CardActionLocation.PLAYER_HAND_CARD, player });
        this.moveNode({
          node,
          to: { location: CardActionLocation.DISCARD_PILE },
        }).then(() => {
          this.removeCardNode(node);
          resolve(null);
        });
      }
    });
  }

  //打出卡牌动画，播放声音
  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    const { card, player } = data;
    console.log(card);
    if (player.id === 0 && card.id != null) {
      this.handCardList.removeData(card);
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    }
    const node = this.addCard(card, { location: CardActionLocation.PLAYER, player });
    this.moveNode({ node, to: { location: CardActionLocation.DISCARD_PILE }, duration: 0.8 });
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const { card, flag } = data;
    if (!flag) {
      this.setAction(
        card.gameObject.node,
        tween(card.gameObject.node)
          .delay(1)
          .call(() => {
            this.removeCardNode(card.gameObject.node);
          }),
        false
      );
    }
  }

  giveCards({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          this.handCardList.removeData(card);
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        });
      }
      console.log(cardList);
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
      if (player.id === 0) {
        this.handCardList.removeData(message);
        message.status = CardStatus.FACE_DOWN;
        message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      }

      const node = this.addCard(message, { location: CardActionLocation.PLAYER, player });
      this.transmissionMessageObject = message.gameObject;
      this.moveNode({
        node,
        to: { location: CardActionLocation.PLAYER, player: targetPlayer },
      }).then(() => {
        resolve(null);
      });
    });
  }

  //传递情报动画
  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    return new Promise((resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      this.moveNode({
        node: message.gameObject.node,
        to: { location: CardActionLocation.PLAYER, player: messagePlayer },
      }).then(() => {
        resolve(null);
      });
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
      if (message.status === CardStatus.FACE_DOWN) {
        message.flip().then(() => {
          this.moveNode({
            node: message.gameObject.node,
            to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
          });
          this.scaleNode({
            node: message.gameObject.node,
            scale: new Vec3(0, 0, 1),
          }).then(() => {
            this.removeCardNode(message.gameObject.node);
            resolve(null);
          });
        });
      } else {
        this.moveNode({
          node: message.gameObject.node,
          to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
        });
        this.scaleNode({
          node: message.gameObject.node,
          scale: new Vec3(0, 0, 1),
        }).then(() => {
          this.removeCardNode(message.gameObject.node);
          resolve(null);
        });
      }
    });
  }

  messagePlacedIntoMessageZone({ player, message }: GameEventType.MessagePlacedIntoMessageZone) {
    return this.addCardToMessageZone({
      player,
      card: message,
      from: { location: CardActionLocation.DECK },
    });
  }

  discardMessage(message) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      await message.flip();
      await this.moveNode({
        node: message.gameObject.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: 0.3,
      });
      this.removeCardNode(message.gameObject.node);
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
      const node = this.addCard(messageList, { location: CardActionLocation.PLAYER, player });
      this.moveNode({
        node,
        to: { location: CardActionLocation.DISCARD_PILE },
      }).then(() => {
        this.removeCardNode(node);
        resolve(null);
      });
    });
  }
}
