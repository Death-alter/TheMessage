import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class JiZhi extends Skill {
  constructor(character: Character) {
    super({
      name: "急智",
      character: character,
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
    });
  }

  init() {
  }

  dispose() {
  }

  onUse() {}

}
