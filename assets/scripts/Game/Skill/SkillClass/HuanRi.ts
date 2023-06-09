import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class HuanRi extends Skill {
  constructor(character: Character) {
    super({
      name: "换日",
      character,
      description: "你使用【调包】或【破译】后，可以将你的角色牌翻至面朝下。",
    });
  }

  init() {}

  dispose() {}
}
