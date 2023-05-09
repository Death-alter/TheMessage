import { GameEventCenter } from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
import { DataContainer } from "../Container/DataContainer";
import { GameLog } from "./GameLog";
import { GameLogContainer } from "./GameLogContainer";
import { GameLogWindow } from "./GameLogWindow";
import * as GameEventType from "../../Event/GameEventType";
import { ObjectPool } from "../ObjectPool";
import { GameLogMessageObject } from "./GameLogMessageObject";
import { Card } from "../Card/Card";
import { CardColor, CardDirection } from "../Card/type";
import { CardObject } from "../Card/CardObject";

export class GameLogList extends DataContainer<GameLog> {
  logMessagePool: ObjectPool<GameLogMessageObject>;

  //   protected _gameObject: GameObject<GameLog>;

  //   get gameObject(): T {
  //     return this._gameObject;
  //   }

  //   set gameObject(object: T | null) {
  //     if (object == this._gameObject) return;
  //     if (object) {
  //       if (this._gameObject) {
  //         this._gameObject.data = null;
  //       }
  //       this._gameObject = object;
  //       object.data = this;
  //     } else {
  //       const oldObject = this._gameObject;
  //       this._gameObject = null;
  //       oldObject.data = null;
  //     }
  //   }

  constructor(gameObject?: GameLogContainer | GameLogWindow) {
    super(gameObject);
  }

  private formatCard(card: Card) {
    let colorStr = "";
    if (card.color && card.color.length) {
      if (card.color.length === 1) {
        switch (card.color[0]) {
          case CardColor.BLACK:
            colorStr += `<color=#FFFFFF>黑色</color>`;
            break;
          case CardColor.BLUE:
            colorStr += `<color=${CardObject.colors[card.color[0]]}>蓝色</color>`;
            break;
          case CardColor.RED:
            colorStr += `<color=${CardObject.colors[card.color[0]]}>红色</color>`;
            break;
        }
      } else {
        for (let item of card.color) {
          switch (item) {
            case CardColor.BLACK:
              colorStr += `<color=#FFFFFF>黑</color>`;
              break;
            case CardColor.BLUE:
              colorStr += `<color=${CardObject.colors[item]}>蓝</color>`;
              break;
            case CardColor.RED:
              colorStr += `<color=${CardObject.colors[item]}>红</color>`;
              break;
          }
        }
      }
    }
    if (colorStr) {
      return `【${colorStr}|${card.name}】`;
    } else {
      return `【${card.name}】`;
    }
  }

  registerEvents() {
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard, this);
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard, this);
    GameEventCenter.on(GameEvent.PLAYER_PLAY_CARD, this.onPlayerPlayCard, this);
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.onPlayerGiveCard, this);
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.onPlayerSendMessage, this);
    GameEventCenter.on(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.onPlayerChooseReceiveMessage, this);
    GameEventCenter.on(GameEvent.PLAYER_RECEIVE_MESSAGE, this.onPlayerReceiveMessage, this);
    GameEventCenter.on(GameEvent.PLAYER_REOMVE_MESSAGE, this.onPlayerRemoveMessage, this);
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission, this);
    GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.onCardAddToHandCard, this);
    GameEventCenter.on(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.onMessagePlacedIntoMessageZone, this);
  }

  unregisterEvents() {
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.onPlayerPlayCard);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.onPlayerGiveCard);
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.onPlayerSendMessage);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.onPlayerChooseReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.onPlayerReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_REOMVE_MESSAGE, this.onPlayerRemoveMessage);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission);
    GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.onCardAddToHandCard);
    GameEventCenter.off(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.onMessagePlacedIntoMessageZone);
  }

  onPlayerDrawCard({ cardList, player }: GameEventType.PlayerDrawCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}抽了${cardList.length}张牌。`));
  }

  onPlayerDiscardCard({ cardList, player }: GameEventType.PlayerDiscardCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}弃了${cardList.length}张牌。`));
  }

  onPlayerPlayCard({ player, targetPlayer, card }: GameEventType.PlayerPlayCard) {
    if (targetPlayer) {
      this.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}对【${targetPlayer.seatNumber + 1}号】${
            targetPlayer.character.name
          }使用了${this.formatCard(card)}`
        )
      );
    } else {
      this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用了${this.formatCard(card)}`));
    }
  }

  onPlayerGiveCard({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    this.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}交给了【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }${cardList.length}张牌`
      )
    );
  }

  onPlayerSendMessage({ player, direction, targetPlayer }: GameEventType.PlayerSendMessage) {
    switch (direction) {
      case CardDirection.LEFT:
        this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}传出情报，方向向左`));
        break;
      case CardDirection.RIGHT:
        this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}传出情报，方向向右`));
        break;
      case CardDirection.UP:
        this.addData(
          new GameLog(
            `【${player.seatNumber + 1}号】${player.character.name}传出情报，目标为【${
              targetPlayer.seatNumber + 1
            }号】${targetPlayer.character.name}`
          )
        );
        break;
    }
  }

  onPlayerChooseReceiveMessage({ player }: GameEventType.PlayerChooseReceiveMessage) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}选择接收情报`));
  }

  onPlayerReceiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    this.addData(
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}成功接收情报${this.formatCard(message)}`)
    );
  }

  onPlayerRemoveMessage({ player, messageList }: GameEventType.PlayerRemoveMessage) {
    let str = `【${player.seatNumber + 1}号】${player.character.name}移除情报情报`;

    for (let message of messageList) {
      str += this.formatCard(message);
    }
    this.addData(new GameLog(str));
  }

  onMessageTransmission({ messagePlayer, message }: GameEventType.MessageTransmission) {
    this.addData(new GameLog(`情报转移至【${messagePlayer.seatNumber + 1}号】${messagePlayer.character.name}`));
  }

  onCardAddToHandCard({ player, card }: GameEventType.CardAddToHandCard) {
    console.log(card);
    this.addData(
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}把${this.formatCard(card)}加入手牌`)
    );
  }

  onMessagePlacedIntoMessageZone({ player, message }: GameEventType.MessagePlacedIntoMessageZone) {
    this.addData(
      new GameLog(`情报${this.formatCard(message)}被置入【${player.seatNumber + 1}号】${player.character.name}`)
    );
  }
}
