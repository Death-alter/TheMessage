import { Skill } from "../Skill";

export class JingMeng extends Skill {
  constructor() {
    super({
      name: "惊梦",
      description: "你接收黑色情报后，可以查看一名角色的手牌，然后从中选择一张弃置。",
    });
  }

  init() {}

  dispose() {}
}
