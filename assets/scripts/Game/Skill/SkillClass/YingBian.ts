import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class YingBian extends Skill {
  constructor(character: Character) {
    super({
      name: "应变",
      character,
      description: "你的【截获】可以当做【误导】使用。",
    });
  }

  init() {}

  dispose() {}
}
