import { Skill } from "../Skill";

export class YouDao extends Skill {
  constructor() {
    super({
      name: "诱导",
      description: "你使用【误导】后，摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
