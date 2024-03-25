import { _decorator, animation, Component, instantiate, Node, Prefab, UITransform, Vec2, Vec3 } from "cc";
import { KeyframeAnimationManager } from "./KeyframeAnimation";
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
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
import { UnknownCard } from "../../../Components/Card/CardClass/UnknownCard";
const { ccclass, property } = _decorator;

@ccclass("KeyframeAnimationLayer")
export class KeyframeAnimationPlayer extends Component {
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
    const f = from ? from.position || this.getLocation(from.location, from.player) : null;
    const t = to.position || this.getLocation(to.location, to.player);
    return KeyframeAnimationManager.playAnimation({
      target: node,
      animation: [
        {
          attribute: "worldPosition",
          from: f,
          to: t,
          duration,
        },
      ],
    });
  }

  private moveNodeAsync({ node, from, to, duration = config.animationDuration }: MoveNodeParams) {
    return new Promise((resolve, reject) => {
      const track = KeyframeAnimationManager.playAnimation({
        target: node,
        animation: [
          {
            attribute: "worldPosition",
            from: from ? this.getLocation(from.location, from.player) : null,
            to: this.getLocation(to.location, to.player),
            duration,
          },
        ],
        onComplete: () => {
          resolve(track);
        },
      });
      if (!track) reject(new Error("对象不存在"));
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
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [
          {
            attribute: "scale",
            to: scale,
            duration,
          },
        ],
      },
      "mix",
    );
  }

  private scaleNodeAsync({
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
        {
          target: node,
          animation: [
            {
              attribute: "scale",
              to: scale,
              duration,
            },
          ],
          onComplete: () => {
            resolve(track);
          },
        },
        "mix",
      );
      if (!track) reject(new Error("对象不存在"));
    });
  }

  private addCard(card: Card, loaction?: ActionLocation): Node;
  private addCard(cards: Card[], loaction?: ActionLocation): Node;
  private addCard(card: Card | Card[], loaction?: ActionLocation): Node {
    let node: Node;
    const obj: any = {};
    if (card instanceof Array) {
      const cardGroup = new DataContainer<Card>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      for (const c of card) {
        if (!c?.gameObject?.node) {
          c.gameObject = GamePools.cardPool.get();
        } else {
          c.gameObject.getComponentInChildren(OuterGlow).closeOuterGlow();
        }
        c.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(c);
      }
      node = cardGroup.gameObject.node;
      obj.data = cardGroup;
    } else {
      if (!card?.gameObject?.node) {
        card.gameObject = GamePools.cardPool.get();
      } else {
        card.gameObject.getComponentInChildren(OuterGlow).closeOuterGlow();
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
      for (const card of data.list) {
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
    KeyframeAnimationManager.playAnimation({
      target: transform,
      animation: [
        {
          attribute: "width",
          to: Math.sqrt(dx * dx + dy * dy),
          duration,
        },
      ],
    }).on(duration + 1, () => {
      this.node.removeChild(line);
    });
  }

  addCardToHandCard({ player, card, from }: { player: Player; card: Card; from?: ActionLocation });
  addCardToHandCard({ player, cards, from }: { player: Player; cards: Card[]; from?: ActionLocation });
  addCardToHandCard(data: { player: Player; card?: Card; cards?: Card[]; from?: ActionLocation }) {
    const { player, from } = data;
    const card = data.card || data.cards;
    return new Promise((resolve, reject) => {
      const node = this.addCard(<Card>card, from);
      this.moveNodeAsync({
        node,
        from,
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        if (player.id === 0) {
          if (card instanceof Array) {
            for (const c of card) {
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
    return new Promise(async (resolve, reject) => {
      const node = this.addCard(<Card>card, from);
      if (!from.player || from.player !== player) {
        await this.moveNodeAsync({
          node,
          from,
          to: { location: CardActionLocation.PLAYER, player },
        });
      }
      this.moveNode({
        node,
        to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
      });
      this.scaleNode({
        node,
        scale: new Vec3(0, 0, 1),
      }).on("complete", () => {
        this.removeCardNode(node);
        resolve(null);
      });
    });
  }

  moveCard({ card, from, to }: { card: Card; from?: ActionLocation; to: ActionLocation }) {
    const node = this.addCard(<Card>card, from);
    return this.moveNodeAsync({
      node,
      from,
      to,
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
      const node = this.addCard(cardList, { location: CardActionLocation.PLAYER_HAND_CARD, player });
      this.moveNodeAsync({
        node,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
        to: { location: CardActionLocation.DISCARD_PILE },
      }).then(() => {
        this.removeCardNode(node);
        resolve(null);
      });
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
      duration: config.animationDuration * 1.35,
    });
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const { card, flag } = data;
    if (!flag && card && card.gameObject) {
      KeyframeAnimationManager.playAnimation({
        target: card.gameObject.node,
        animation: [],
      }).on(1, () => {
        this.removeCardNode(card.gameObject.node);
      });
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
    const node = this.addCard(message, { location: CardActionLocation.PLAYER, player });
    this.transmissionMessageObject = message.gameObject;
    return this.moveNode({
      node,
      to: { location: CardActionLocation.PLAYER, player: targetPlayer },
    });
  }

  //传递情报动画
  transmitMessage({ messagePlayer, message }: GameEventType.MessageTransmission) {
    if (!message.gameObject) {
      message.gameObject = this.transmissionMessageObject;
    }
    return this.moveNode({
      node: message.gameObject.node,
      to: { location: CardActionLocation.PLAYER, player: messagePlayer },
    });
  }

  //选择接收情报
  chooseReceiveMessage({ player, message }: GameEventType.PlayerChooseReceiveMessage) {
    if (message) {
      KeyframeAnimationManager.playAnimation({
        target: message?.gameObject?.node,
        animation: [
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
        ],
      });
    }
  }

  //接收情报动画
  receiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      if (message.status === CardStatus.FACE_DOWN) {
        message.status = CardStatus.FACE_UP;
        await this.turnOverMessage(message);
      }
      this.moveNode({
        node: message?.gameObject?.node,
        to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
      });
      this.scaleNode({
        node: message.gameObject.node,
        scale: new Vec3(0, 0, 1),
      }).on("complete", () => {
        this.removeCardNode(message.gameObject.node);
        resolve(null);
      });
    });
  }

  //查看待收情报
  viewMessage({ player, message }: GameEventType.PlayerViewMessage) {
    return new Promise((resolve, reject) => {
      if (player.id !== 0) {
        resolve(null);
        return;
      }
      if (message instanceof UnknownCard) {
        resolve(null);
        return;
      }
      if (message?.status === CardStatus.FACE_UP) {
        resolve(null);
        return;
      }
      if (!message?.gameObject) {
        resolve(null);
        return;
      }
      const node = message.gameObject.node.getChildByName("Inner");
      const gameObject = message.gameObject;
      KeyframeAnimationManager.playAnimation({
        target: node,
        animation: [
          {
            attribute: "scale",
            to: new Vec3(0, 1, 1),
            duration: 0.2,
          },
          {
            attribute: "scale",
            to: new Vec3(1, 1, 1),
            startTime: 0.2,
            duration: 0.2,
          },
          {
            attribute: "scale",
            to: new Vec3(0, 1, 1),
            startTime: 1.4,
            duration: 0.2,
          },
          {
            attribute: "scale",
            to: new Vec3(1, 1, 1),
            startTime: 1.6,
            duration: 0.2,
          },
        ],
      })
        .on(0, () => {
          gameObject.data = message.copy();
        })
        .on(0.2, () => {
          gameObject.data.status = CardStatus.FACE_UP;
        })
        .on(1.6, () => {
          gameObject.data.status = CardStatus.FACE_DOWN;
        })
        .on(1.8, () => {
          gameObject.data = message;
          resolve(null);
        });
    });
  }

  turnOverMessage(message: Card) {
    return new Promise((resolve, reject) => {
      if (message instanceof UnknownCard) {
        resolve(null);
        return;
      }
      if (!message?.gameObject) {
        resolve(null);
        return;
      }
      const node = message.gameObject.node.getChildByName("Inner");
      //翻面动画
      const gameObject = message.gameObject;
      KeyframeAnimationManager.playAnimation({
        target: node,
        animation: [
          {
            attribute: "scale",
            to: new Vec3(0, 1, 1),
            duration: 0.2,
          },
          {
            attribute: "scale",
            to: new Vec3(1, 1, 1),
            startTime: 0.2,
            duration: 0.2,
          },
        ],
      })
        .on(0, () => {
          const temp = message.copy();
          temp.toogleStatus();
          gameObject.data = temp;
        })
        .on(0.2, () => {
          gameObject.data.toogleStatus();
        })
        .on(0.9, () => {
          gameObject.data = message;
          resolve(null);
        });
    });
  }

  discardMessage(message: Card) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject) {
        message.gameObject = this.transmissionMessageObject;
      }
      if (message.status === CardStatus.FACE_DOWN) {
        message.status = CardStatus.FACE_UP;
        await this.turnOverMessage(message);
      }
      const track = this.moveNode({
        node: message.gameObject.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: config.animationDuration,
      });
      track.on("complete", () => {
        this.removeCardNode(message.gameObject.node);
        resolve(null);
      });
    });
  }

  replaceMessage({ message, oldMessage, messagePlayer }: GameEventType.MessageReplaced) {
    return new Promise(async (resolve, reject) => {
      if (!message.gameObject || !message.gameObject.node) {
        this.addCard(message, { location: CardActionLocation.DECK });
      }
      this.transmissionMessageObject = message.gameObject;
      await this.discardMessage(oldMessage);
      await this.turnOverMessage(message);
      await this.moveNode({
        node: this.transmissionMessageObject.node,
        to: { location: CardActionLocation.PLAYER, player: messagePlayer },
        duration: config.animationDuration,
      });
      resolve(null);
    });
  }

  removeMessage({ player, messageList }: GameEventType.PlayerRemoveMessage) {
    return new Promise((resolve, reject) => {
      const node = this.addCard(messageList, { location: CardActionLocation.PLAYER, player });
      this.moveNodeAsync({
        node,
        to: { location: CardActionLocation.DISCARD_PILE },
      }).then(() => {
        this.removeCardNode(node);
        resolve(null);
      });
    });
  }
}
