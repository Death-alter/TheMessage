import { _decorator, Component, tween, Node, Vec3 } from "cc";
import { Card, UnknownCard } from "../Game/Card/Card";
import { DataContainer } from "../Game/Container/DataContainer";
import { CardStatus, GameCard } from "../Game/Card/type";
import GamePools from "./GamePools";
import * as GameEventType from "../Event/GameEventType";
import { CardObject } from "../Game/Card/CardObject";
import { HandCardList } from "../Game/Container/HandCardList";

const { ccclass, property } = _decorator;

@ccclass("CardAction")
export class CardAction extends Component {
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  cardInProcessNode: Node | null = null;

  public transmissionMessageObject: CardObject;

  //抽牌动画
  drawCards({ player, cardList }: GameEventType.PlayerDrawCard, handCardList: HandCardList) {
    return new Promise((resolve, reject) => {
      const cardGroup = new DataContainer<GameCard>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();
      for (let card of cardList) {
        (<Card>card).gameObject = GamePools.cardPool.get();
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
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
        })
        .start();
    });
  }

  //弃牌动画
  discardCards({ player, cardList }: GameEventType.PlayerDiscardCard, handCardList: HandCardList) {
    return new Promise((resolve, reject) => {
      if (player.id === 0) {
        cardList.forEach((card) => {
          handCardList.removeData(card);
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
        this.node.addChild(cardGroup.gameObject.node);
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
            cardGroup.gameObject = null;
            resolve(null);
          })
          .start();
      }
    });
  }

  //打出卡牌动画，播放声音
  playerPlayCard(data: GameEventType.PlayerPalyCard) {
    const { card, player } = data;
    if (!card.gameObject) {
      (<Card>card).gameObject = GamePools.cardPool.get();
      card.gameObject.node.setParent(this.node);
      card.gameObject.node.worldPosition = player.gameObject.node.worldPosition;
    }

    if (player.id === 0) {
      tween(card.gameObject.node)
        .to(0.6, {
          scale: new Vec3(0.6, 0.6, 1),
          worldPosition: this.discardPileNode.worldPosition,
        })
        .start();
    } else {
      card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
      tween(card.gameObject.node)
        .to(0.6, {
          worldPosition: this.discardPileNode.worldPosition,
        })
        .start();
    }
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPalyCard) {
    const { card, flag } = data;
    // tween(card.gameObject.node)
    //   .to(0.6, {
    //     worldPosition: this.discardPileNode.worldPosition,
    //   })
    //   .call(() => {
    //     GamePools.cardPool.put(card.gameObject);
    //     card.gameObject = null;
    //   })
    //   .start();
    if (!flag) {
      GamePools.cardPool.put(card.gameObject);
      card.gameObject = null;
    }
  }

  giveCards({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard, handCardList: HandCardList) {
    return new Promise((resolve, reject) => {
      const cardGroup = new DataContainer<GameCard>();
      cardGroup.gameObject = GamePools.cardGroupPool.get();

      cardList.forEach((card) => {
        if (player.id === 0) {
          handCardList.removeData(card);
        } else {
          (<Card>card).gameObject = GamePools.cardPool.get();
        }
        card.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        cardGroup.addData(card);
      });

      this.node.addChild(cardGroup.gameObject.node);
      cardGroup.gameObject.node.worldPosition = player.gameObject.node.worldPosition;

      tween(cardGroup.gameObject.node)
        .to(0.8, {
          worldPosition: targetPlayer.gameObject.node.worldPosition,
        })
        .call(() => {
          for (let card of cardGroup.list) {
            if (player.id === 0) {
              card.gameObject.node.scale = new Vec3(1, 1, 1);
            } else {
              GamePools.cardPool.put(card.gameObject);
              card.gameObject = null;
            }
          }
          cardGroup.removeAllData();
          GamePools.cardGroupPool.put(cardGroup.gameObject);
          cardGroup.gameObject = null;
          resolve(null);
        })
        .start();
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
        (<Card>message).gameObject = GamePools.cardPool.get();
        worldPosition = panting.worldPosition;
      }

      message.gameObject.node.setParent(this.node);
      message.gameObject.node.worldPosition = worldPosition;
      this.transmissionMessageObject = message.gameObject;

      if (player.id === 0) {
        await (<Card>message).flip();
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
          .start();
      } else {
        message.gameObject.node.scale = new Vec3(0.6, 0.6, 1);
        tween(message.gameObject.node)
          .to(0.5, {
            worldPosition: targetPanting.worldPosition,
          })
          .call(() => {
            resolve(null);
          })
          .start();
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
      tween(message.gameObject.node)
        .to(0.5, {
          worldPosition: panting.worldPosition,
        })
        .call(() => {
          resolve(null);
        })
        .start();
    });
  }

  //选择接收情报
  chooseReceiveMessage({ player, message }: GameEventType.PlayerChooseReceiveMessage) {
    tween(message.gameObject.node)
      .to(0.33, {
        scale: new Vec3(1, 1, 1),
      })
      .to(0.33, {
        scale: new Vec3(0.6, 0.6, 1),
      })
      .start();
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
          .start();
      } else {
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
          .start();
      }
    });
  }

  replaceMessage({ message, oldMessage }: GameEventType.MessageReplaced) {
    return new Promise((resolve, reject) => {
      const worldPosition = oldMessage.gameObject.node.worldPosition;
      tween(message.gameObject.node)
        .to(0.8, {
          worldPosition,
        })
        .start();
      tween(oldMessage.gameObject.node)
        .to(0.8, {
          worldPosition: this.discardPileNode.worldPosition,
        })
        .call(() => {
          GamePools.cardPool.put(message.gameObject);
          message.gameObject = null;
          resolve(null);
        })
        .start();
    });
  }

  removeMessage({ player, message }: GameEventType.PlayerRemoveMessage) {
    return new Promise((resolve, reject) => {
      const panting = player.gameObject.node.getChildByPath("Border/CharacterPanting");
      message.gameObject.node.worldPosition = panting.worldPosition;
      tween(message.gameObject.node)
        .to(0.8, {
          worldPosition: this.discardPileNode.worldPosition,
        })
        .call(() => {
          GamePools.cardPool.put(message.gameObject);
          message.gameObject = null;
          resolve(null);
        })
        .start();
    });
  }
}
