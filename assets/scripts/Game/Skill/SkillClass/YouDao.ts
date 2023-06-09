import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class YouDao extends Skill {
  constructor(character: Character) {
    super({
      name: "诱导",
      character,
      description: "你使用【误导】后，摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
