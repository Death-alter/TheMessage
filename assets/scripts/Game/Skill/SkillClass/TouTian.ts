import { Skill } from "../Skill";

export class TouTian extends Skill {
  constructor() {
    super({
      name: "偷天",
      description: "争夺阶段，你可以翻开此角色牌，然后视为你使用了一张【截获】。",
    });
  }

  init() {}

  dispose() {}
}
