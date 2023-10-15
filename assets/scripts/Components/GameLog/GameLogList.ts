import { GameEventCenter } from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
import { DataContainer } from "../Container/DataContainer";
import { GameLog } from "./GameLog";
import { GameLogContainer } from "../../Scenes/Game/LogLayer/GameLogContainer";
import * as GameEventType from "../../Event/GameEventType";
import { GameLogMessageObject } from "./GameLogMessageObject";
import { Card } from "../Card/Card";
import { CardColor, CardDirection } from "../Card/type";
import { GameLogHistory } from "./GameLogHistory";
import { Player } from "../Player/Player";
import { ActionLocation, CardActionLocation } from "../../Manager/type";
import { ObjectPool } from "../Pool/ObjectPool";

export class GameLogList extends DataContainer<GameLog> {
  logMessagePool: ObjectPool<GameLogMessageObject>;
  logHistory: GameLogHistory;

  constructor(gameObject?: GameLogContainer) {
    super(gameObject);
  }

  addData(data: GameLog) {
    if (this.gameObject) {
      this._list.push(data);
      this.gameObject.onDataAdded(data);
    }
    this.logHistory.addData(new GameLog(data.text));
  }

  formatCard(card: Card) {
    let colorStr = "";
    if (card.color && card.color.length) {
      if (card.color.length === 1) {
        switch (card.color[0]) {
          case CardColor.BLACK:
            colorStr += `黑色`;
            break;
          case CardColor.BLUE:
            colorStr += `<color=${Card.colors[CardColor.BLUE]}>蓝色</color>`;
            break;
          case CardColor.RED:
            colorStr += `<color=${Card.colors[CardColor.RED]}>红色</color>`;
            break;
        }
      } else {
        for (let item of card.color) {
          switch (item) {
            case CardColor.BLACK:
              colorStr += `黑`;
              break;
            case CardColor.BLUE:
              colorStr += `<color=${Card.colors[CardColor.BLUE]}>蓝</color>`;
              break;
            case CardColor.RED:
              colorStr += `<color=${Card.colors[CardColor.RED]}>红</color>`;
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

  formatPlayer(player: Player) {
    return `【${player.seatNumber + 1}号】${player.character.name}`;
  }

  fromatLoaction(l: ActionLocation) {
    const { location, player } = l;
    switch (location) {
      case CardActionLocation.DECK:
        return "牌堆";
      case CardActionLocation.DISCARD_PILE:
        return "弃牌堆";
      case CardActionLocation.PLAYER:
        if (!player) {
          return "";
        }
        return this.formatPlayer(player);
      case CardActionLocation.PLAYER_HAND_CARD:
        if (!player) {
          return "";
        }
        return this.formatPlayer(player) + "的手牌";
      case CardActionLocation.PLAYER_MESSAGE_ZONE:
        if (!player) {
          return "";
        }
        return this.formatPlayer(player) + "的情报区";
      default:
        return "";
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
    GameEventCenter.on(GameEvent.PLAYER_USE_SKILL, this.onPlayerUseSkill, this);
    GameEventCenter.on(GameEvent.PLAYER_BEFORE_DEATH, this.onPlayerDie, this);
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission, this);
    GameEventCenter.on(GameEvent.MESSAGE_REMOVED, this.onMessageRemoved, this);
  }

  unregisterEvents() {
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard, this);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard, this);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.onPlayerPlayCard, this);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.onPlayerGiveCard, this);
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.onPlayerSendMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.onPlayerChooseReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.onPlayerReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_USE_SKILL, this.onPlayerUseSkill, this);
    GameEventCenter.off(GameEvent.PLAYER_BEFORE_DEATH, this.onPlayerDie, this);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.onMessageTransmission, this);
    GameEventCenter.off(GameEvent.MESSAGE_REMOVED, this.onMessageRemoved, this);
  }

  onPlayerDrawCard({ cardList, player }: GameEventType.PlayerDrawCard) {
    this.addData(new GameLog(`${this.formatPlayer(player)}抽了${cardList.length}张牌。`));
  }

  onPlayerDiscardCard({ cardList, player }: GameEventType.PlayerDiscardCard) {
    let str = `${this.formatPlayer(player)}弃了`;
    if (cardList.length <= 3) {
      for (let card of cardList) {
        str += this.formatCard(card);
      }
    } else {
      str += `${cardList.length}张牌。`;
    }
    this.addData(new GameLog(str));
  }

  onPlayerPlayCard({ player, targetPlayer, card }: GameEventType.PlayerPlayCard) {
    if (targetPlayer) {
      this.addData(
        new GameLog(`${this.formatPlayer(player)}对${this.formatPlayer(targetPlayer)}使用了${this.formatCard(card)}`)
      );
    } else {
      this.addData(new GameLog(`${this.formatPlayer(player)}使用了${this.formatCard(card)}`));
    }
  }

  onPlayerGiveCard({ player, targetPlayer, cardList }: GameEventType.PlayerGiveCard) {
    this.addData(
      new GameLog(`${this.formatPlayer(player)}交给了${this.formatPlayer(targetPlayer)}${cardList.length}张牌`)
    );
  }

  onPlayerSendMessage({ player, direction, targetPlayer, lockedPlayer }: GameEventType.PlayerSendMessage) {
    let str = `${this.formatPlayer(player)}传出情报，`;
    switch (direction) {
      case CardDirection.LEFT:
        str += "方向向左";
        break;
      case CardDirection.RIGHT:
        str += "方向向右";
        break;
      case CardDirection.UP:
        str += `目标为${this.formatPlayer(targetPlayer)}`;
        break;
    }
    if (lockedPlayer) {
      str += `，锁定${this.formatPlayer(lockedPlayer)}`;
    }
    this.addData(new GameLog(str));
  }

  onPlayerChooseReceiveMessage({ player }: GameEventType.PlayerChooseReceiveMessage) {
    this.addData(new GameLog(`${this.formatPlayer(player)}选择接收情报`));
  }

  onPlayerReceiveMessage({ player, message }: GameEventType.PlayerReceiveMessage) {
    this.addData(new GameLog(`${this.formatPlayer(player)}成功接收情报${this.formatCard(message)}`));
  }

  onPlayerUseSkill({ player, skill }: GameEventType.PlayerUseSkill) {
    this.addData(new GameLog(`${this.formatPlayer(player)}使用技能【${skill.name}】`));
  }

  onPlayerDie({ player, loseGame }: GameEventType.PlayerBeforeDeath) {
    if (loseGame) {
      this.addData(new GameLog(`${this.formatPlayer(player)}由于没有情报可以传出而输掉游戏`));
    } else {
      this.addData(new GameLog(`${this.formatPlayer(player)}死亡`));
    }
  }

  onMessageTransmission({ messagePlayer, message }: GameEventType.MessageTransmission) {
    this.addData(new GameLog(`情报转移至${this.formatPlayer(messagePlayer)}`));
  }

  onMessageRemoved(message) {
    this.addData(new GameLog(`传递中的情报${this.formatCard(message)}被弃置`));
  }
}
