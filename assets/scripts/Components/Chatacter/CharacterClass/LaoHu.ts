import { Character } from "../Character";
import { Sex } from "../type";import { YunChouWeiWo } from "../../Skill/SkillClass/YunChouWeiWo";

export class LaoHu extends Character {
  constructor() {
    super({
      id: 38,
      name: "老虎",
      sprite: "images/characters/LaoHu",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new YunChouWeiWo(this)]);
  }
}
