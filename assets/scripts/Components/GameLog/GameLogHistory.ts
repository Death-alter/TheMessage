import { DataContainer } from "../Container/DataContainer";
import { GameObjectContainer } from "../Container/GameObjectContainer";
import { GameLog } from "./GameLog";
import { GameLogTextObject } from "./GameLogTextObject";

export class GameLogHistory extends DataContainer<GameLog> {
  constructor(gameObject?: GameObjectContainer) {
    super(gameObject);
  }
}
