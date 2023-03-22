import { _decorator, Component, tween, Node, Vec3 } from "cc";
import { Card, UnknownCard } from "../Game/Card/Card";
import { Player } from "../Game/Player/Player";
import { DataContainer } from "../Game/Container/DataContainer";
import { CardStatus, GameCard } from "../Game/Card/type";
import { CardObject } from "../Game/Card/CardObject";
import { HandCardContianer } from "../Game/Container/HandCardContianer";
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

  private _messageInTransmit: GameCard | null = null;

  //播放动画
  playAction(actionName: string) {
    if (this[actionName] && this[actionName] instanceof Function) {
      this[actionName]();
    }
  }

  //抽牌动画
  drawCards(player: Player, cardList: GameCard[]) {
    const cardGroup = new DataContainer<GameCard>();
    cardGroup.gameObject = GamePools.cardGroupPool.get();
    for (let card of cardList) {
      if (!card.gameObject) {
        (<Card>card).gameObject = GamePools.cardPool.get();
      }
      cardGroup.addData(card);
    }
    this.node.addChild(cardGroup.gameObject.node);
    cardGroup.gameObject.node.worldPosition = this.deckNode.worldPosition;

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
        cardGroup.removeAllData();
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
      const cardGroup = new DataContainer<GameCard>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      cardList.forEach((card) => {
        if (!card.gameObject) {
          (<Card>card).gameObject = GamePools.cardPool.get();
        }
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(card);
      });
      cardGroup.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
      tween(cardGroup.gameObject.node)
        .to(0.6, { worldPosition: this.discardPileNode.worldPosition })
        .call(() => {
          for (let card of cardGroup.list) {
            GamePools.cardPool.put(card.gameObject);
            card.gameObject = null;
          }
          cardGroup.removeAllData();
          GamePools.cardGroupPool.put(cardGroup.gameObject);
        });
    }
  }

  //打出卡牌动画，播放声音
  useCard(user: Player, target: Player, card: Card) {}

  giveCards(form: Player, to: Player, cards: GameCard[]) {}

  //开始传递情报动画
  async seedMessage(player: Player, message: GameCard) {
    const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
    if (message instanceof UnknownCard && !message.gameObject) {
      message.gameObject = GamePools.cardPool.get();
    }
    message.gameObject.node.setParent(this.node);
    this._messageInTransmit = message;
    if (this._messageInTransmit.status === CardStatus.FACE_UP) {
      await this.turnOverMessage(<Card>this._messageInTransmit);
    }
    if (player.id === 0) {
      tween(message.gameObject.node)
        .to(0.8, {
          worldPosition: panting.worldPosition,
          scale: new Vec3(0.6, 0.6, 1),
        })
        .start();
    } else {
      message.gameObject.node.worldPosition = panting.worldPosition;
      message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
    }
  }

  //传递情报动画
  transmitMessage(player: Player) {
    const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
    tween(this._messageInTransmit.gameObject.node)
      .to(0.8, {
        worldPosition: panting.worldPosition,
      })
      .start();
  }

  //翻开情报动画
  turnOverMessage(message?: Card) {
    console.log(message);
    if (this._messageInTransmit instanceof Card) {
      return this._messageInTransmit.flip();
    } else {
      message.gameObject = this._messageInTransmit.gameObject;
      this._messageInTransmit = message;
      this._messageInTransmit.status = CardStatus.FACE_DOWN;
      return message.flip();
    }
  }

  chooseReceiveMessage() {
    tween(this._messageInTransmit.gameObject.node)
      .to(0.33, {
        scale: new Vec3(1, 1, 1),
      })
      .to(0.33, {
        scale: new Vec3(0.6, 0.6, 1),
      })
      .start();
  }

  //接收情报动画
  async receiveMessage(player: Player, card: Card) {
    if (this._messageInTransmit.id !== card.id) {
      card.gameObject = this._messageInTransmit.gameObject;
      this._messageInTransmit = card;
    }
    const messageContainer = player.gameObject.node.getChildByPath("Border/Message");
    console.log(this._messageInTransmit);
    if (this._messageInTransmit.status === CardStatus.FACE_DOWN) {
      const time = new Date().getTime();
      await this.turnOverMessage(<Card>this._messageInTransmit);
      console.log(time - new Date().getTime());
    }
    tween(this._messageInTransmit.gameObject.node)
      .to(0.5, {
        worldPosition: messageContainer.worldPosition,
        scale: new Vec3(0, 0, 1),
      })
      .call(() => {
        GamePools.cardPool.put(this._messageInTransmit.gameObject);
        this._messageInTransmit.gameObject = null;
      })
      .start();
  }
}
