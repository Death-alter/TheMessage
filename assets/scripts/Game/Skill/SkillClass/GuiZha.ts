import { Skill } from "../Skill";

export class GuiZha extends Skill {
  constructor() {
    super({
      name: "诡诈",
      description: "出牌阶段限一次，你可以指定一名角色，然后视为你对其使用了一张【威逼】或【利诱】。",
    });
  }

  init() {}

  dispose() {}
}
