import { Skill } from "../Skill";

export class ShiSi extends Skill {
  constructor() {
    super({
      name: "视死",
      description: "你接收黑色情报后，摸两张牌。",
    });
  }

  init() {}

  dispose() {}
}
