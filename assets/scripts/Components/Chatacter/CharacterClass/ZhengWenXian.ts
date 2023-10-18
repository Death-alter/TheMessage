import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { TouTian } from "../../Skill/SkillClass/TouTian";
import { HuanRi } from "../../Skill/SkillClass/HuanRi";

export class ZhengWenXian extends Character {
  constructor() {
    super({
      id: 15,
      name: "鄭文先",
      sprite: "images/characters/ZhengWenXian",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new TouTian(this), new HuanRi(this)]);
  }
}
