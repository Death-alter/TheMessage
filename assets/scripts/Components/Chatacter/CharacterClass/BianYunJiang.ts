import { Character } from "../Character";
import { Sex } from "../type";import { YouDiShenRu } from "../../Skill/SkillClass/YouDiShenRu";
import { JianDiFengXing } from "../../Skill/SkillClass/JianDiFengXing";

export class BianYunJiang extends Character {
  constructor() {
    super({
      id: 47,
      name: "边云疆",
      sprite: "images/characters/NoPanting",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new YouDiShenRu(this), new JianDiFengXing(this)]);
  }
}
