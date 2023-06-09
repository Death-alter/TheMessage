import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class GuangFaBao extends Skill {
  constructor(character: Character) {
    super({
      name: "广发报",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后摸三张牌，并且你可以将你的任意张手牌置入任意名角色的情报区。你不能通过此技能让任何角色收集三张或更多同色情报。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
