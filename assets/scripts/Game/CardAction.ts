import { _decorator, Component, tween, Tween, Node, Vec3, TweenEasing, ITweenOption, game } from "cc";
import { Card } from "../Data/Cards/Card";
import { Player } from "../Data/Player/Player";
import { DataContainer } from "../Data/DataContainer/DataContainer";
import { GameCard } from "../Data/Cards/type";
import { CardObject } from "../GameObject/Card/CardObject";
import { HandCardContianer } from "../GameObject/GameObjectContainer/HandCardContianer";
import GamePools from "./GamePools";

const { ccclass, property } = _decorator;

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  handCardNode: Node | null = null;

  //播放动画
  playAction(actionName: string) {
    if (this[actionName] instanceof Function) {
      this[actionName]();
    }
  }

  //抽卡动画
  drawCards(player: Player, cardList: GameCard[]) {
    const cardGroup = new DataContainer<GameCard, CardObject>();
    cardGroup.gameObject = GamePools.cardGroupPool.get();
    for (let card of cardList) {
      (<Card>card).gameObject = GamePools.cardPool.get();
      cardGroup.addData(card);
    }
    this.node.addChild(cardGroup.gameObject.node);
    cardGroup.gameObject.node.worldPosition = this.deckNode.worldPosition;
    cardGroup.gameObject.node.active = true;
    tween(cardGroup.gameObject.node)
      .to(0.6, { worldPosition: player.gameObject.node.worldPosition })
      .call(() => {
        for (let card of cardGroup.list) {
          if (player.id === 0) {
            card.gameObject.node.scale = new Vec3(1, 1, 1);
            this.handCardNode.getComponent(HandCardContianer).data.addData(card as Card);
          } else {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
        }
        GamePools.cardGroupPool.put(cardGroup.gameObject);
      })
      .start();
  }

  //弃牌动画
  discardCards(player: Player, cardList: GameCard[]) {
    if (player.id === 0) {
      cardList.forEach((card) => {
        card.gameObject.node.setParent(this.node);
        tween(card.gameObject.node)
          .to(0.6, {
            scale: new Vec3(0.6, 0.6, 1),
            worldPosition: this.discardPileNode.worldPosition,
          })
          .call(() => {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          })
          .start();
      });
    } else {
      const cardGroup = new DataContainer<GameCard, CardObject>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      cardList.forEach((card) => {
        (<Card>card).gameObject = GamePools.cardPool.get();
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(card);
      });
      cardGroup.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
      cardGroup.gameObject.node.active = true;
      tween(cardGroup.gameObject.node)
        .to(0.6, { worldPosition: this.discardPileNode.worldPosition })
        .call(() => {
          for (let card of cardGroup.list) {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
          GamePools.cardGroupPool.put(cardGroup.gameObject);
        });
    }
  }

  //打出卡牌动画
  useCard(user: Player, target: Player, card: Card) {}

  //传递情报动画
  seedMessage() {}

  //
}
