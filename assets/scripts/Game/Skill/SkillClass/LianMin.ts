import { Skill } from "../Skill";

export class LianMin extends Skill {
  constructor() {
    super({
      name: "怜悯",
      description: "你传出的非黑色情报被接收后，可以从你或接收者的情报区中选择一张黑色情报加入你的手牌。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
