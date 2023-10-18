import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { YiHuaJieMu } from "../../Skill/SkillClass/YiHuaJieMu";

export class HanMei extends Character {
  constructor() {
    super({
      id: 14,
      name: "韩梅",
      sprite: "images/characters/HanMei",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new YiHuaJieMu(this)]);
  }
}
