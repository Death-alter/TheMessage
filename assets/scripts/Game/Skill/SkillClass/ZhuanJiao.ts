import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class ZhuanJiao extends Skill {
  constructor(character: Character) {
    super({
      name: "转交",
      character,
      description:
        "你使用一张手牌后，可以从你的情报区选择一张非黑色情报，将其置入另一名角色的情报区，然后你摸两张牌。你不能通过此技能让任何角色收集三张或更多同色情报。",
    });
  }

  init() {}

  dispose() {}
}
