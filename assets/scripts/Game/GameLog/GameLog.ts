import { DataBasic } from "../../DataBasic";
import { GameLogMessageObject } from "./GameLogMessageObject";
import { GameLogTextObject } from "./GameLogTextObject";
import { Player } from "../Player/Player";
import { GameCard } from "../Card/type";
import { Skill } from "../Skill/Skill";

export class GameLog extends DataBasic<GameLogMessageObject & GameLogTextObject> {
  // public player: Player;
  // public card: GameCard;
  // public message: GameCard;
  // public skill: Skill;
  public text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }
}
