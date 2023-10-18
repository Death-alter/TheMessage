import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { YingBian } from "../../Skill/SkillClass/YingBian";
import { YouDao } from "../../Skill/SkillClass/YouDao";

export class LiNingYuSP extends Character {
  constructor() {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new YingBian(this), new YouDao(this)]);
  }
}
