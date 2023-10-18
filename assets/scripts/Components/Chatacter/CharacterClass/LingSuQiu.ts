import { Character } from "../Character";
import { Sex } from "../type";import { TanXuBianShi } from "../../Skill/SkillClass/TanXuBianShi";
import { CunBuBuRang } from "../../Skill/SkillClass/CunBuBuRang";

export class LingSuQiu extends Character {
  constructor() {
    super({
      id: 44,
      name: "凌素秋",
      sprite: "images/characters/NoPanting_Famale",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new TanXuBianShi(this), new CunBuBuRang(this)]);
  }
}
