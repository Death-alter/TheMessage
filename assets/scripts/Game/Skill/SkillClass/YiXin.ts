import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class YiXin extends Skill {
  constructor(character: Character) {
    super({
      name: "遗信",
      character,
      description: "你死亡前，可以将一张手牌置入另一名角色的情报区。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
