import { Skill } from "../Skill";

export class YiHuaJieMu extends Skill {
  constructor() {
    super({
      name: "移花接木",
      description:
        "争夺阶段，你可以翻开此角色牌，然后从一名角色的情报区选择一张情报，将其置入另一名角色的情报区，若如此做会让其收集三张或更多同色情报，则改为将该牌加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
