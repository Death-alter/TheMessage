import { Character } from "../Character";
import { Sex } from "../type";import { GuanHai } from "../../Skill/SkillClass/GuanHai";
import { BiFeng } from "../../Skill/SkillClass/BiFeng";

export class ChiJingHai extends Character {
  constructor() {
    super({
      id: 33,
      name: "池镜海",
      sprite: "images/characters/ChiJingHai",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new GuanHai(this), new BiFeng(this)]);
  }
}
