import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec2, Vec3 } from "cc";
import { KeyframeAnimationManager } from "./KeyframeAnimation";
import { Player } from "../../../Components/Player/Player";
import { ActionLocation, CardActionLocation, MoveNodeParams } from "../../../Manager/type";
import { CardObject } from "../../../Components/Card/CardObject";
import { HandCardList } from "../../../Components/Container/HandCardList";
import config from "../../../config";
import { Card } from "../../../Components/Card/Card";
import GamePools from "../../../Components/Pool/GamePools";
import { CardGroupObject } from "../../../Components/Container/CardGroupObject";
import { CardEntity, CardStatus } from "../../../Components/Card/type";
import { UnknownCard } from "../../../Components/Card/CardClass/UnknownCard";
import { GameManager } from "../../../Manager/GameManager";
import { UIEventCenter } from "../../../Event/EventTarget";
import { UIEvent } from "../../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("KeyframeAnimationPlayer")
export class KeyframeAnimationPlayer extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Prefab)
  line: Prefab | null = null;

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
        callbacks: {
          complete: () => {
            resolve(track);
          },
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
          callbacks: {
            complete: () => {
              resolve(track);
            },
          },
        },
        "mix",
      );
      if (!track) reject(new Error("对象不存在"));
    });
  }

  private addCard(card: CardEntity, loaction?: ActionLocation): Node {
    if (!card) return null;
    if (card.node.parent === this.node) return card.node;
    this.node.addChild(card.node);
    if (loaction) {
      card.node.worldPosition = this.getLocation(loaction.location, loaction.player);
    }
    return card.node;
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

  setCard(card: CardEntity, loaction: ActionLocation) {
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

  addCardToHandCard({ player, entity, from }: { player: Player; entity: CardEntity; from?: ActionLocation }) {
    return new Promise((resolve, reject) => {
      const node = this.addCard(entity, from);
      this.moveNodeAsync({
        node,
        from,
        to: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      }).then(() => {
        if (player.id === 0) {
          if (entity instanceof CardGroupObject) {
            for (const c of entity.data.list) {
              this.handCardList.addData(<Card>c);
            }
          } else {
            this.handCardList.addData(entity.data);
          }
        } else {
          this.removeCardNode(node);
        }
        resolve(null);
      });
    });
  }

  addCardToMessageZone({ player, entity, from }: { player: Player; entity: CardEntity; from?: ActionLocation }) {
    return new Promise(async (resolve, reject) => {
      const node = this.addCard(entity, from);
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

  moveCard({
    entity,
    from,
    to,
    duration,
  }: {
    entity: CardEntity;
    from?: ActionLocation;
    to: ActionLocation;
    duration?: number;
  }) {
    const node = this.addCard(entity, from);
    return this.moveNodeAsync({
      node,
      from,
      to,
      duration,
    });
  }

  //抽牌动画
  drawCards(player: Player, entity: CardEntity) {
    return this.addCardToHandCard({
      player,
      entity,
      from: { location: CardActionLocation.DECK },
    });
  }

  //弃牌动画
  discardCards(player: Player, entity: CardEntity) {
    return new Promise((resolve, reject) => {
      const node = this.addCard(entity, { location: CardActionLocation.PLAYER_HAND_CARD, player });
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
  playerPlayCard(player: Player, entity: CardObject) {
    if (player.id === 0 && entity.data.id != null) {
      entity.node.scale = new Vec3(0.6, 0.6, 1);
    }
    const node = this.addCard(entity, { location: CardActionLocation.PLAYER, player });
    this.moveNode({
      node,
      to: { location: CardActionLocation.DISCARD_PILE },
      duration: config.animationDuration * 1.35,
    });
  }

  afterPlayerPlayCard(entity: CardObject, flag: boolean) {
    if (entity) {
      KeyframeAnimationManager.playAnimation({
        target: entity.node,
        animation: [],
      }).on(1, () => {
        if (flag !== false) {
          this.removeCardNode(entity.node);
        }
        UIEventCenter.emit(UIEvent.PLAY_CARD_ANIMATION_FINISH, entity);
      });
    }
  }

  giveCards(player: Player, targetPlayer: Player, entity: CardEntity) {
    return this.addCardToHandCard({
      player: targetPlayer,
      entity,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
  }

  playerSendMessage(player: Player, targetPlayer: Player, entity: CardEntity) {
    const node = this.addCard(entity, { location: CardActionLocation.PLAYER, player });
    return this.moveNode({
      node,
      to: { location: CardActionLocation.PLAYER, player: targetPlayer },
    });
  }

  //传递情报动画
  transmitMessage(messagePlayer: Player, entity: CardEntity) {
    return this.moveNode({
      node: entity.node,
      to: { location: CardActionLocation.PLAYER, player: messagePlayer },
    });
  }

  //选择接收情报
  chooseReceiveMessage(entity: CardEntity) {
    if (entity) {
      KeyframeAnimationManager.playAnimation({
        target: entity.node,
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
  receiveMessage(player: Player, message: Card, entity: CardObject) {
    return new Promise(async (resolve, reject) => {
      if (entity.data.status === CardStatus.FACE_DOWN) {
        entity.data.status = CardStatus.FACE_UP;
        await this.turnOverMessage(message, entity);
      }
      this.moveNode({
        node: entity?.node,
        to: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player },
      });
      this.scaleNode({
        node: entity.node,
        scale: new Vec3(0, 0, 1),
      }).on("complete", () => {
        this.removeCardNode(entity.node);
        resolve(null);
      });
    });
  }

  //查看待收情报
  viewMessage(player: Player, message: Card, entity: CardObject) {
    return new Promise((resolve, reject) => {
      if (player.id !== 0) {
        resolve(null);
        return;
      }
      if (message?.status === CardStatus.FACE_UP) {
        resolve(null);
        return;
      }
      if (message instanceof UnknownCard) {
        resolve(null);
        return;
      }
      if (!entity) {
        resolve(null);
        return;
      }
      const node = entity.node.getChildByName("Inner");
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
          entity.data = message.copy();
        })
        .on(0.2, () => {
          entity.data.status = CardStatus.FACE_UP;
        })
        .on(1.6, () => {
          entity.data.status = CardStatus.FACE_DOWN;
        })
        .on(1.8, () => {
          entity.data = message;
          resolve(null);
        });
    });
  }

  turnOverMessage(message: Card, entity: CardObject) {
    return new Promise((resolve, reject) => {
      if (!entity) {
        resolve(null);
        return;
      }
      if (message instanceof UnknownCard) {
        resolve(null);
        return;
      }
      const node = entity.node.getChildByName("Inner");
      //翻面动画
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
          entity.data = temp;
        })
        .on(0.2, () => {
          entity.data.toogleStatus();
        })
        .on(0.9, () => {
          entity.data = message;
          resolve(null);
        });
    });
  }

  discardMessage(message: Card, entity: CardObject) {
    return new Promise(async (resolve, reject) => {
      if (entity.data.status === CardStatus.FACE_DOWN) {
        entity.data.status = CardStatus.FACE_UP;
        await this.turnOverMessage(message, entity);
      }
      const track = this.moveNode({
        node: entity.node,
        to: { location: CardActionLocation.DISCARD_PILE },
        duration: config.animationDuration,
      });
      track.on("complete", () => {
        this.removeCardNode(entity.node);
        resolve(null);
      });
    });
  }

  replaceMessage(
    messagePlayer: Player,
    message: Card,
    entity: CardObject,
    oldMessage: Card,
    oldEntity: CardObject,
    turnOver: boolean,
  ) {
    return new Promise(async (resolve, reject) => {
      this.discardMessage(oldMessage, oldEntity);
      KeyframeAnimationManager.playAnimation({ target: entity.node, animation: [] }).on(
        config.animationDuration,
        () => {},
      );
      if (turnOver) {
        this.turnOverMessage(message, entity);
      }
      await this.moveCard({
        entity,
        to: { location: CardActionLocation.PLAYER, player: messagePlayer },
        duration: config.animationDuration,
      });
      resolve(null);
    });
  }

  removeMessage(player: Player, entity: CardEntity) {
    return new Promise((resolve, reject) => {
      const node = this.addCard(entity, { location: CardActionLocation.PLAYER, player });
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
