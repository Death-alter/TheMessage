import { Skill } from "../Skill";

export class JiZhi extends Skill {
  constructor() {
    super({
      name: "急智",
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
    });
  }

  init() {
  }

  dispose() {
  }

  onUse() {}

}
