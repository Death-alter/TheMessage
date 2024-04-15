import { DataBasic } from "../../DataBasic";
import { GameLogMessageEntity } from "./GameLogMessageEntity";
import { GameLogTextEntity } from "./GameLogTextEntity";

export class GameLog extends DataBasic<GameLogTextEntity & GameLogMessageEntity> {
  public text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }
}
