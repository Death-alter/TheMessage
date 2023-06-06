import { Skill } from "../Skill";

export class JiaoJi extends Skill {
  constructor() {
    super({
      name: "交际",
      description:
        "出牌阶段限一次，你可以抽取一名角色的最多两张手牌，然后将等量的手牌交给该角色。你每收集一张黑色情报，便可以少交一张手牌。",
    });
  }

  init() {}

  dispose() {}
}
