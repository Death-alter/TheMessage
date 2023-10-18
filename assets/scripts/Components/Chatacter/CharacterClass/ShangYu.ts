import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { JieDaoShaRen } from "../../Skill/SkillClass/JieDaoShaRen";

export class ShangYu extends Character {
  constructor() {
    super({
      id: 30,
      name: "商玉",
      sprite: "images/characters/ShangYu",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new JieDaoShaRen(this)]);
  }
}
