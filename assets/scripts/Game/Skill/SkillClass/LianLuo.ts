import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class LianLuo extends Skill {
  constructor(character: Character) {
    super({
      name: "联络",
      character: character,
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }

  init() {}

  dispose() {}
}
