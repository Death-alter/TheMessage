import { Skill } from "../Skill";

export class JinShen extends Skill {
  constructor() {
    super({
      name: "谨慎",
      description: "你接收双色情报后，可以用一张手牌与该情报面朝上互换。",
    });
  }

  init() {}

  dispose() {}
}
