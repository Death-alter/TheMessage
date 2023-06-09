import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class MiaoBiQiaoBian extends Skill {
  constructor(character: Character) {
    super({
      name: "妙笔巧辩",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后从所有角色的情报区选择合计至多两张不含有相同颜色的情报，将其加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
