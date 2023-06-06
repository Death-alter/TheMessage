import { Skill } from "../Skill";

export class JinBi extends Skill {
  constructor() {
    super({
      name: "禁闭",
      description:
        "出牌阶段限一次，你可以指定一名角色，除非其交给你两张手牌，否则其本回合不能使用手牌，且所有角色技能无效。",
    });
  }

  init() {}

  dispose() {}
}
