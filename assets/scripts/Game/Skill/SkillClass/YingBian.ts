import { Skill } from "../Skill";

export class YingBian extends Skill {
  constructor() {
    super({
      name: "应变",
      description:
        "你的【截获】可以当做【误导】使用。",
    });
  }

  init() {}

  dispose() {}
}
