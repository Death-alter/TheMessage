import { _decorator, Component, instantiate, Node, Prefab, tween, UITransform, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;
import { KeyframeAnimationManager } from "./KeyFrameAnimation";
import { Player } from "../../../Components/Player/Player";
import { ActionLocation, CardActionLocation, MoveNodeParams } from "../../../Manager/type";
import { CardObject } from "../../../Components/Card/CardObject";
import { HandCardList } from "../../../Components/Container/HandCardList";
import config from "../../../config";
import { Card } from "../../../Components/Card/Card";
import { DataContainer } from "../../../Components/Container/DataContainer";
import GamePools from "../../../Components/Pool/GamePools";
import { CardGroupObject } from "../../../Components/Container/CardGroupObject";
import * as GameEventType from "../../../Event/GameEventType";
import { CardStatus } from "../../../Components/Card/type";

@ccclass("KeyFrameAnimationLayer")
export class KeyFrameAnimationPlayer extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Prefab)
  line: Prefab | null = null;

  public transmissionMessageObject: CardObject;
  public handCardList: HandCardList;

  private getLocation(location: CardActionLocation, player?: Player) {
    switch (location) {
      case CardActionLocation.DECK:
        return this.deckNode.worldPosition.clone();
      case CardActionLocation.DISCARD_PILE:
        return this.discardPileNode.worldPosition.clone();
      case CardActionLocation.PLAYER:
        return (
          player &&
          player.gameObject &&
          player.gameObject.node.getChildByPath("Border/CharacterPanting").worldPosition.clone()
        );
      case CardActionLocation.PLAYER_HAND_CARD:
        return player && player.gameObject && player.gameObject.node.worldPosition.clone();
      case CardActionLocation.PLAYER_MESSAGE_ZONE:
        return (
          player && player.gameObject && player.gameObject.node.getChildByPath("Border/Message").worldPosition.clone()
        );
      default:
        return this.node.worldPosition.clone();
    }
  }

  private moveNode({ node, from, to, duration = config.animationDuration }: MoveNodeParams) {
    return new Promise((resolve, reject) => {
      const track = KeyframeAnimationManager.playAnimation(
        node,
        [
          {
            attribute: "worldPosition",
            from: from ? this.getLocation(from.location, from.player) : null,
            to: this.getLocation(to.location, to.player),
            duration,
          },
        ],
        () => {
          resolve(track);
        }
      );
    });
  }

  private scaleNode({
    node,
    scale,
    duration = config.animationDuration,
  }: {
    node: Node;
    scale: Vec3;
    duration?: number;
  }) {
    return new Promise((resolve, reject) => {
      const track = KeyframeAnimationManager.playAnimation(
        node,
        [
          {
            attribute: "scale",
            to: scale,
            duration,
          },
        ],
        () => {
          resolve(track);
        }
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
        if (!c?.gameObject?.node) {
          c.gameObject = GamePools.cardPool.get();
        }
        c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(c);
      }
      node = cardGroup.gameObject.node;
      obj.data = cardGroup;
    } else {
      if (!(card.gameObject && card.gameObject.node)) {
        card.gameObject = GamePools.cardPool.get();
      }
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      node = card.gameObject.node;
      obj.data = card;
    }
    this.node.addChild(node);
    if (loaction) {
      node.worldPosition = this.getLocation(loaction.location, loaction.player);
    }
    obj.node = node;
    return node;
  }

  private removeCardNode(node: Node) {
    this.node.removeChild(node);
    if (node.getComponent(CardObject)) {
      node.scale = new Vec3(0.6, 0.6, 1);
      GamePools.cardPool.put(node.getComponent(CardObject));
    } else {
      const data = node.getComponent(CardGroupObject).data;
      for (let card of data.list) {
        GamePools.cardPool.put(card.gameObject);
        card.gameObject = null;
      }
      data.removeAllData();
      node.scale = new Vec3(1, 1, 1);
      GamePools.cardGroupPool.put(<CardGroupObject>data.gameObject);
    }
  }

  setCard(card: Card, loaction: ActionLocation) {
    this.addCard(card, loaction);
  }

  clear() {
    this.node.removeAllChildren();
  }

  showIndicantLine({
    from,
    to,
    duration = config.animationDuration,
  }: {
    from: ActionLocation;
    to: ActionLocation;
    duration?: number;
  }) {
    const line = instantiate(this.line);
    this.node.addChild(line);
    const fromPosition = this.getLocation(from.location, from.player);
    const toPosition = this.getLocation(to.location, to.player);
    const dx = toPosition.x - fromPosition.x;
    const dy = toPosition.y - fromPosition.y;

    line.worldPosition = fromPosition;
    const transform = line.getComponent(UITransform);
    transform.width = 0;
    const dir = new Vec2(dx, -dy);
    const degree = (dir.signAngle(new Vec2(1, 0)) / Math.PI) * 180;
    line.angle = degree;
    line.active = true;
    KeyframeAnimationManager.playAnimation(
      transform,
      [
        {
          attribute: "width",
          to: Math.sqrt(dx * dx + dy * dy),
          duration,
        },
      ],
      () => {
        setTimeout(() => {
          this.node.removeChild(line);
        }, 1000);
      }
    );
  }

  addCardToHandCard({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToHandCard({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToHandCard(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
    const { player, from } = data;
    const card = data.card || data.cards;
    return new Promise((resolve, reject) => {
      const node = this.addCard(<Card>card, from);
      this.moveNode({
        node,
        from,
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        if (player.id === 0) {
          if (card instanceof Array) {
            for (let c of card) {
              this.handCardList.addData(c);
            }
          } else {
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
    return new Promise((resolve, reject) => {
      const node = this.addCard(<Card>card, from);
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
          card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
          const node = this.addCard(card);
          this.moveNode({
            node,
            from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
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

  //使用卡牌
  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    const { card, player } = data;
    if (player.id === 0 && card.id != null) {
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    }
    const node = this.addCard(card, { location: CardActionLocation.PLAYER, player });
    this.moveNode({
      node,
      to: { location: CardActionLocation.DISCARD_PILE },
      duration: config.animationDuration * 1.5,
    });
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const { card, flag } = data;
    if (!flag && card && card.gameObject) {
      setTimeout(() => {
        this.removeCardNode(card.gameObject.node);
      }, 1000);
    }
  }

  giveCards({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    return this.addCardToHandCard({
      player: targetPlayer,
      cards: cardList,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
  }

  playerSendMessage({ player, message, targetPlayer }: GameEventType.PlayerSendMessage) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = GamePools.cardPool.get();
      }
      if (player.id === 0) {
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
    if (message) {
      KeyframeAnimationManager.playAnimation(message.gameObject.node, [
        {
          attribute: "scale",
          to: new Vec3(1, 1, 1),
          duration: config.animationDuration * 0.55,
        },
        {
          attribute: "scale",
          to: new Vec3(0.6, 0.6, 1),
          startTime: config.animationDuration * 0.55,
          duration: config.animationDuration * 0.55,
        },
      ]);
    }
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
            node: message?.gameObject?.node,
            to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
          }).catch((e) => {});
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

  discardMessage(message: Card) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      if (message.status === CardStatus.FACE_DOWN) await message.flip();
      await this.moveNode({
        node: message.gameObject.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: config.animationDuration * 0.5,
      });
      this.removeCardNode(message.gameObject.node);
      resolve(null);
    });
  }

  replaceMessage({ message, oldMessage, messagePlayer }: GameEventType.MessageReplaced) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject || !message.gameObject.node) {
        this.addCard(message, { location: CardActionLocation.DECK });
      }
      this.transmissionMessageObject = message.gameObject;
      const worldPosition = this.getLocation(CardActionLocation.PLAYER, messagePlayer);
      await this.discardMessage(oldMessage);
      await message.flip();
      await this.moveNode({
        node: this.transmissionMessageObject.node,
        to: { position: worldPosition },
        duration: config.animationDuration,
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
