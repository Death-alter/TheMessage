import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { ZhuanJiao } from "../../Skill/SkillClass/ZhuanJiao";

export class BaiXiaoNian extends Character {
  constructor() {
    super({
      id: 25,
      name: "白小年",
      sprite: "images/characters/BaiXiaoNian",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new ZhuanJiao(this)]);
  }
}
