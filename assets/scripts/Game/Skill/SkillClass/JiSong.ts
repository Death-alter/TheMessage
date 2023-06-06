import { Skill } from "../Skill";

export class JiSong extends Skill {
  constructor() {
    super({
      name: "急送",
      description:
        "争夺阶段限一次，你可以弃置两张手牌，或从你的情报区弃置一张非黑色情报，然后将待收情报移至一名角色面前。",
    });
  }

  init() {}

  dispose() {}
}
