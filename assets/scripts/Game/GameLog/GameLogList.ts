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
import { CardDirection } from "../Card/type";

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

  registerEvents() {
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard, this);
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard, this);
    GameEventCenter.on(GameEvent.PLAYER_PLAY_CARD, this.onPlayerPlayCard, this);
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.onPlayerGiveCard, this);
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.onPlayerSendMessage, this);
  }

  unregisterEvents() {
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.onPlayerPlayCard);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.onPlayerGiveCard);
  }

  onPlayerDrawCard({ cardList, player }: GameEventType.PlayerDrawCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}抽了${cardList.length}张牌。`));
  }

  onPlayerDiscardCard({ cardList, player }: GameEventType.PlayerDiscardCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}弃了${cardList.length}张牌。`));
  }

  onPlayerPlayCard({ player, targetPlayer, card }: GameEventType.PlayerPalyCard) {
    card = <Card>card;
    if (targetPlayer) {
      this.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}对【${targetPlayer.seatNumber + 1}号】${
            targetPlayer.character.name
          }使用了${card.name}`
        )
      );
    } else {
      this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用了${card.name}`));
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

  onPlayerSendMessage({ player, direction }: GameEventType.PlayerSendMessage) {
    let directionText;
    switch (direction) {
      case CardDirection.LEFT:
        directionText = "左";
      case CardDirection.RIGHT:
        directionText = "右";
      case CardDirection.UP:
        directionText = "上";
    }
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}传出情报，方向向${directionText}`));
  }
}
