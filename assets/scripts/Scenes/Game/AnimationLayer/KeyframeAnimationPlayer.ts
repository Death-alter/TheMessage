import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec2, Vec3 } from "cc";
import {
  AnimationAction,
  AttributeNumberVariationOption,
  AttributeVertexVariationOption,
  KeyframeAnimationManager,
} from "./KeyframeAnimation";
import { Player } from "../../../Components/Player/Player";
import { ActionLocation, CardActionLocation } from "../../../Manager/type";
import { CardEntity } from "../../../Components/Card/CardEntity";
import { HandCardList } from "../../../Components/Container/HandCardList";
import config from "../../../config";
import { Card } from "../../../Components/Card/Card";
import GamePools from "../../../Components/Pool/GamePools";
import { CardGroupEntity } from "../../../Components/Container/CardGroupEntity";
import { CardsEntity, CardStatus } from "../../../Components/Card/type";
import { UnknownCard } from "../../../Components/Card/CardClass/UnknownCard";
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
          player && player.entity && player.entity.node.getChildByPath("Border/CharacterPanting").worldPosition.clone()
        );
      case CardActionLocation.PLAYER_HAND_CARD:
        return player && player.entity && player.entity.node.worldPosition.clone();
      case CardActionLocation.PLAYER_MESSAGE_ZONE:
        return player && player.entity && player.entity.node.getChildByPath("Border/Message").worldPosition.clone();
      default:
        return this.node.worldPosition.clone();
    }
  }

  private createMoveAnimation(
    to: ActionLocation,
    from?: ActionLocation,
    startTime?: number,
    duration: number = config.animationDuration,
  ) {
    const f = from ? from.position || this.getLocation(from.location, from.player) : null;
    const t = to.position || this.getLocation(to.location, to.player);
    return {
      attribute: "worldPosition",
      from: f,
      to: t,
      duration,
      startTime,
    };
  }

  private createScaleAnimation(scale: Vec3, startTime?: number, duration: number = config.animationDuration) {
    return {
      attribute: "scale",
      to: scale,
      duration,
      startTime,
    };
  }

  private addCard(card: CardsEntity, loaction?: ActionLocation): Node {
    if (!card) return null;
    if (card.node.parent === this.node) return card.node;
    this.node.addChild(card.node);
    if (loaction) {
      card.node.worldPosition = this.getLocation(loaction.location, loaction.player);
    } else {
      card.node.worldPosition = this.getLocation(CardActionLocation.DECK);
    }
    return card.node;
  }

  private removeCardNode(node: Node) {
    this.node.removeChild(node);
    const entity = node.getComponent(CardEntity);
    if (entity) {
      node.scale = new Vec3(0.6, 0.6, 1);
      entity.data = null;
      GamePools.cardPool.put(entity);
    } else {
      const data = node.getComponent(CardGroupEntity).data;
      for (const card of data.list) {
        GamePools.cardPool.put(card.entity);
        card.entity = null;
      }
      data.removeAllData();
      node.scale = new Vec3(1, 1, 1);
      GamePools.cardGroupPool.put(<CardGroupEntity>data.entity);
    }
  }

  setCard(card: CardEntity, loaction?: ActionLocation) {
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

  addCardToHandCard({
    player,
    entity,
    from,
    queueName,
  }: {
    player: Player;
    entity: CardsEntity;
    from?: ActionLocation;
    queueName?: string;
  }) {
    const node = this.addCard(entity, from);
    const message = entity.data;
    console.log(message);
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [this.createMoveAnimation({ location: CardActionLocation.PLAYER_HAND_CARD, player }, from)],
      },
      queueName,
    ).on("complete", () => {
      console.log(message, entity.data);
      if (player.id === 0) {
        if (entity instanceof CardGroupEntity) {
          for (const c of entity.data.list) {
            this.handCardList.addData(<Card>c);
          }
          this.node.removeChild(node);
          GamePools.cardGroupPool.put(entity);
        } else {
          console.log(entity.data);
          this.handCardList.addData(entity.data);
        }
      } else {
        this.removeCardNode(node);
      }
    });
  }

  addCardToMessageZone({ player, entity, from }: { player: Player; entity: CardsEntity; from?: ActionLocation }) {
    const node = this.addCard(entity, from);
    const animation: (AttributeNumberVariationOption | AttributeVertexVariationOption)[] = [];
    if (!from.player || from.player !== player) {
      animation.push(this.createMoveAnimation({ location: CardActionLocation.PLAYER, player }, from));
    }
    animation.push(this.createMoveAnimation({ location: CardActionLocation.PLAYER_MESSAGE_ZONE, player }));
    animation.push(this.createScaleAnimation(new Vec3(0, 0, 1)));
    if (animation.length > 2) {
      animation[1].startTime = config.animationDuration;
      animation[2].startTime = config.animationDuration;
    }
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation,
      },
      "global",
    ).on("complete", () => {
      this.removeCardNode(node);
    });
  }

  moveCard({
    entity,
    from,
    to,
    duration,
    queueName,
    startTime = 0,
  }: {
    entity: CardsEntity;
    from?: ActionLocation;
    to: ActionLocation;
    duration?: number;
    startTime?: number;
    queueName?: string;
  }) {
    const node = this.addCard(entity, from);
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [this.createMoveAnimation(to, from, startTime, duration)],
      },
      queueName,
    );
  }

  //抽牌动画
  drawCards(player: Player, entity: CardsEntity) {
    return this.addCardToHandCard({
      player,
      entity,
      from: { location: CardActionLocation.DECK },
    });
  }

  //弃牌动画
  discardCards(player: Player, entity: CardsEntity) {
    const node = this.addCard(entity, { location: CardActionLocation.PLAYER_HAND_CARD, player });
    return KeyframeAnimationManager.playAnimation({
      target: node,
      animation: [
        this.createMoveAnimation(
          { location: CardActionLocation.DISCARD_PILE },
          { location: CardActionLocation.PLAYER_HAND_CARD, player },
        ),
      ],
    }).on("complete", () => {
      this.removeCardNode(node);
    });
  }

  //使用卡牌
  playerPlayCard(player: Player, entity: CardEntity) {
    if (player.id === 0 && entity.data.id != null) {
      entity.node.scale = new Vec3(0.6, 0.6, 1);
    }
    return this.moveCard({
      entity,
      from: { location: CardActionLocation.PLAYER, player },
      to: { location: CardActionLocation.DISCARD_PILE },
      duration: config.animationDuration * 1.35,
    });
  }

  afterPlayerPlayCard(entity: CardEntity, flag: boolean) {
    if (entity) {
      KeyframeAnimationManager.playAnimation(
        {
          target: entity.node,
          animation: [],
        },
        "global",
      ).on(1, () => {
        if (flag !== false) {
          this.removeCardNode(entity.node);
        }
        UIEventCenter.emit(UIEvent.PLAY_CARD_ANIMATION_FINISH, entity);
      });
    }
  }

  giveCards(player: Player, targetPlayer: Player, entity: CardsEntity) {
    return this.addCardToHandCard({
      player: targetPlayer,
      entity,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
  }

  playerSendMessage(player: Player, targetPlayer: Player, entity: CardEntity) {
    const node = this.addCard(entity);
    entity.refresh(entity.data);
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [
          this.createMoveAnimation(
            { location: CardActionLocation.PLAYER, player: targetPlayer },
            { location: CardActionLocation.PLAYER, player },
          ),
        ],
      },
      "global",
    );
  }

  //传递情报动画
  transmitMessage(messagePlayer: Player, entity: CardEntity) {
    return KeyframeAnimationManager.playAnimation(
      {
        target: entity.node,
        animation: [this.createMoveAnimation({ location: CardActionLocation.PLAYER, player: messagePlayer })],
      },
      "global",
    );
  }

  //选择接收情报
  chooseReceiveMessage(entity: CardEntity) {
    return KeyframeAnimationManager.playAnimation(
      {
        target: entity.node,
        animation: [
          this.createScaleAnimation(new Vec3(1, 1, 1), 0, config.animationDuration * 0.55),
          this.createScaleAnimation(
            new Vec3(0.6, 0.6, 1),
            config.animationDuration * 0.55,
            config.animationDuration * 0.55,
          ),
        ],
      },
      "global",
    );
  }

  //接收情报动画
  receiveMessage(player: Player, message: Card, entity: CardEntity) {
    if (message.status === CardStatus.FACE_DOWN) {
      message.status = CardStatus.FACE_UP;
      this.turnOverMessage(message, entity);
    }
    return KeyframeAnimationManager.playAnimation(
      {
        target: entity.node,
        animation: [
          this.createMoveAnimation({ location: CardActionLocation.PLAYER_MESSAGE_ZONE, player }),
          this.createScaleAnimation(new Vec3(0, 0, 1)),
        ],
      },
      "global",
    ).on("complete", () => {
      this.removeCardNode(entity.node);
    });
  }

  //查看待收情报
  viewMessage(player: Player, message: Card, entity: CardEntity) {
    if (player.id !== 0) {
      return;
    }
    if (message?.status === CardStatus.FACE_UP) {
      return;
    }
    if (message instanceof UnknownCard) {
      return;
    }
    if (!entity) {
      return;
    }
    const node = entity.node.getChildByName("Inner");
    return KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [
          this.createScaleAnimation(new Vec3(0, 1, 1), 0, 0.2),
          this.createScaleAnimation(new Vec3(1, 1, 1), 0.2, 0.2),
          this.createScaleAnimation(new Vec3(0, 1, 1), 1.4, 0.2),
          this.createScaleAnimation(new Vec3(1, 1, 1), 1.6, 0.2),
        ],
      },
      "global",
    )
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
      });
  }

  turnOverMessage(message: Card, entity: CardEntity) {
    if (!entity) {
      return;
    }
    if (message instanceof UnknownCard) {
      return;
    }
    const node = entity.node.getChildByName("Inner");
    //翻面动画
    const track = KeyframeAnimationManager.playAnimation(
      {
        target: node,
        animation: [
          this.createScaleAnimation(new Vec3(0, 1, 1), 0, 0.2),
          this.createScaleAnimation(new Vec3(1, 1, 1), 0.2, 0.2),
        ],
      },
      "global",
    )
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
      });
    return track;
  }

  discardMessage(message: Card, entity: CardEntity) {
    if (entity.data.status === CardStatus.FACE_DOWN) {
      message.status = CardStatus.FACE_UP;
      this.turnOverMessage(message, entity);
    }
    return KeyframeAnimationManager.playAnimation(
      {
        target: entity.node,
        animation: [this.createMoveAnimation({ location: CardActionLocation.DISCARD_PILE })],
      },
      "global",
    ).on("complete", () => {
      this.removeCardNode(entity.node);
    });
  }

  replaceMessage(
    messagePlayer: Player,
    message: Card,
    entity: CardEntity,
    oldMessage: Card,
    oldEntity: CardEntity,
    status: CardStatus = CardStatus.FACE_DOWN,
  ) {
    this.addCard(entity);
    this.discardMessage(oldMessage, oldEntity);
    if (status !== message.status) {
      const c = message.copy();
      c.toogleStatus();
      this.turnOverMessage(c, entity).on("complete", () => {
        message.status = status;
        entity.data = message;
      });
    } else {
      entity.refresh(message);
    }
    return this.moveCard({
      entity,
      to: { location: CardActionLocation.PLAYER, player: messagePlayer },
      duration: config.animationDuration,
      queueName: "global",
    });
  }

  removeMessage(player: Player, entity: CardsEntity) {
    return this.moveCard({
      entity,
      from: { location: CardActionLocation.PLAYER, player },
      to: { location: CardActionLocation.DISCARD_PILE },
      queueName: "global",
    }).on("complete", () => {
      this.removeCardNode(entity.node);
    });
  }
}
