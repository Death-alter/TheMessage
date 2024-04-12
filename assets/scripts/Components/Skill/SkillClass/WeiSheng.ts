import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";

export class WeiSheng extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "尾声",
      character,
      description: "你获得胜利时，没有身份牌的玩家与你一同获得胜利。",
    });
  }

  init() {}

  dispose() {}
}
