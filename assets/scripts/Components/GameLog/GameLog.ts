import { DataBasic } from "../../DataBasic";
import { GameLogMessageObject } from "./GameLogMessageObject";
import { GameLogTextObject } from "./GameLogTextObject";

export class GameLog extends DataBasic {
  // public player: Player;
  // public card: Card;
  // public message: Card;
  // public skill: Skill;

  public text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }
}
