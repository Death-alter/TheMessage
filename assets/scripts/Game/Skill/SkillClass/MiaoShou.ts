import { Skill } from "../Skill";

export class MiaoShou extends Skill {
  constructor() {
    super({
      name: "妙手",
      description:
        "争夺阶段，你可以翻开此角色牌，然后弃置待收情报，并查看一名角色的手牌和情报区，从中选择一张牌作为待收情报，面朝上移至一名角色的面前。",
    });
  }

  init() {}

  dispose() {}
}
