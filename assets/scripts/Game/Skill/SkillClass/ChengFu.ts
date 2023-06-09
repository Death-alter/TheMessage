import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class ChengFu extends Skill {
  constructor(character: Character) {
    super({
      name: "城府",
      character,
      description: "【试探】和【威逼】对你无效。",
    });
  }

  init() {}

  dispose() {}
}
