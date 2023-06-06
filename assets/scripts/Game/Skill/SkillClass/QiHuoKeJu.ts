import { Skill } from "../Skill";

export class QiHuoKeJu extends Skill {
  constructor() {
    super({
      name: "奇货可居",
      description:
        "你接收双色情报后，可以从你的情报区选择一张情报加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
