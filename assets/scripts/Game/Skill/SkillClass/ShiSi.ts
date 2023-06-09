import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class ShiSi extends Skill {
  constructor(character: Character) {
    super({
      name: "视死",
      character,
      description: "你接收黑色情报后，摸两张牌。",
    });
  }

  init() {}

  dispose() {}
}
