import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class FuHei extends Skill {
  constructor(character: Character) {
    super({
      name: "腹黑",
      character,
      description: "你传出的黑色情报被接收后，你摸一张牌。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
