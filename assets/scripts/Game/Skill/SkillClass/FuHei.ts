import { Skill } from "../Skill";

export class FuHei extends Skill {
  constructor() {
    super({
      name: "腹黑",
      description: "你传出的黑色情报被接收后，你摸一张牌。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
