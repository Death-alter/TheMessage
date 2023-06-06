import { Skill } from "../Skill";

export class XinSiChao extends Skill {
  constructor() {
    super({
      name: "新思潮",
      description: "出牌阶段限一次，你可以弃置一张手牌，然后摸两张牌。",
    });
  }

  init() {}

  dispose() {}
}
