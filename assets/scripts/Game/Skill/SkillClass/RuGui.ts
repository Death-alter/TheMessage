import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class RuGui extends Skill {
  constructor(character: Character) {
    super({
      name: "如归",
      character,
      description: "你死亡前，可以将你情报区中的一张情报置入当前回合角色的情报区中。",
    });
  }

  init() {}

  dispose() {}
}
