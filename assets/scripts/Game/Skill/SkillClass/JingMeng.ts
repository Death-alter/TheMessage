import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class JingMeng extends Skill {
  constructor(character: Character) {
    super({
      name: "惊梦",
      character,
      description: "你接收黑色情报后，可以查看一名角色的手牌，然后从中选择一张弃置。",
    });
  }

  init() {}

  dispose() {}
}
