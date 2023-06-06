import { Skill } from "../Skill";

export class JiangHuLing extends Skill {
  constructor() {
    super({
      name: "江湖令",
      description:
        "你传出情报后，可以宣言一个颜色。本回合中，当情报被接收后，你可以从接收者的情报区弃置一张被宣言颜色的情报，若弃置的是黑色情报，则你摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
