import { Character } from "../Character";
import { Sex } from "../type";import { LianXin } from "../../Skill/SkillClass/LianXin";
import { ShunShiErWei } from "../../Skill/SkillClass/ShunShiErWei";

export class AdultXiaoJiu extends Character {
  constructor() {
    super({
      id: 2027,
      name: "成年小九",
      sprite: "images/characters/NoPanting",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new LianXin(this), new ShunShiErWei(this)]);
  }
}
