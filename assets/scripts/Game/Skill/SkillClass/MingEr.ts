import { Skill } from "../Skill";

export class MingEr extends Skill {
  constructor() {
    super({
      name: "明饵",
      description: "你传出的红色或蓝色情报被接收后，你和接收者各摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
