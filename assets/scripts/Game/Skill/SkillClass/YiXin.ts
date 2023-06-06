import { Skill } from "../Skill";

export class YiXin extends Skill {
  constructor() {
    super({
      name: "遗信",
      description: "你死亡前，可以将一张手牌置入另一名角色的情报区。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
