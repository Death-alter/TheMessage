import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";

export class BiYiShuangFei extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "比翼双飞",
      character,
      description: "你的回合中，当一名男性角色宣胜时，你可以与他一同胜利，且令与他同阵营的其他角色无法胜利。",
    });
  }

  init() {}

  dispose() {}
}
