import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class JiZhi extends Skill {
  constructor(character: Character) {
    super({
      name: "急智",
      character,
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
