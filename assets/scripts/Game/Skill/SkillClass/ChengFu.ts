import { Skill } from "../Skill";

export class ChengFu extends Skill {
  constructor() {
    super({
      name: "城府",
      description: "【试探】和【威逼】对你无效。",
    });
  }

  init() {}

  dispose() {}
}
