import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { ShiSi } from "../../Skill/SkillClass/ShiSi";
import { RuGui } from "../../Skill/SkillClass/RuGui";

export class LaoHan extends Character {
  constructor() {
    super({
      id: 24,
      name: "老汉",
      sprite: "images/characters/LaoHan",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new ShiSi(this), new RuGui(this)]);
  }
}
