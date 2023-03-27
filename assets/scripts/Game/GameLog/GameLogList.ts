import { GameEventCenter } from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
import { DataContainer } from "../Container/DataContainer";
import { GameLog } from "./GameLog";
import { GameLogContainer } from "./GameLogContainer";
import { GameLogWindow } from "./GameLogWindow";
import * as GameEventType from "../../Event/GameEventType";
import { ObjectPool } from "../ObjectPool";
import { GameLogMessageObject } from "./GameLogMessageObject";

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
  }

  unregisterEvents() {
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.onPlayerDrawCard);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.onPlayerDiscardCard);
  }

  onPlayerDrawCard({ cardList, player }: GameEventType.PlayerDrawCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}抽了${cardList.length}张牌。`));
  }

  onPlayerDiscardCard({ cardList, player }: GameEventType.PlayerDiscardCard) {
    this.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}弃了${cardList.length}张牌。`));
  }
}
