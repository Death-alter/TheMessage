import { Character } from "../Character";
import { Sex } from "../type";import { MiXin } from "../../Skill/SkillClass/MiXin";
import { JiangJiJiuJi } from "../../Skill/SkillClass/JiangJiJiuJi";

export class AdultHanMei extends Character {
  constructor() {
    super({
      id: 2014,
      name: "成年韩梅",
      sprite: "images/characters/NoPanting_Famale",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new MiXin(this), new JiangJiJiuJi(this)]);
  }
}
