import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { LianMin } from "../../Skill/SkillClass/LianMin";
import { FuHei } from "../../Skill/SkillClass/FuHei";

export class BaiFeiFei extends Character {
  constructor() {
    super({
      id: 21,
      name: "白菲菲",
      sprite: "images/characters/BaiFeiFei",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new LianMin(this), new FuHei(this)]);
  }
}
