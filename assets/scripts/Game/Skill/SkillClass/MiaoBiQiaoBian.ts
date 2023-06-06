import { Skill } from "../Skill";

export class MiaoBiQiaoBian extends Skill {
  constructor() {
    super({
      name: "妙笔巧辩",
      description:
        "争夺阶段，你可以翻开此角色牌，然后从所有角色的情报区选择合计至多两张不含有相同颜色的情报，将其加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
