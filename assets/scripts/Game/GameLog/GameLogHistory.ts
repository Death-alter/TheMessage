import { DataContainer } from "../Container/DataContainer";
import { GameLog } from "./GameLog";
import { GameLogWindow } from "./GameLogWindow";

export class GameLogHistory extends DataContainer<GameLog> {
  constructor(gameObject?: GameLogWindow) {
    super(gameObject);
  }
}
