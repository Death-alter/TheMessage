import { DataContainer } from "../Container/DataContainer";
import { EntityContainer } from "../Container/EntityContainer";
import { GameLog } from "./GameLog";
import { GameLogTextEntity } from "./GameLogTextEntity";

export class GameLogHistory extends DataContainer<GameLog> {
  constructor(entity?: EntityContainer<GameLogTextEntity>) {
    super(entity);
  }
}
