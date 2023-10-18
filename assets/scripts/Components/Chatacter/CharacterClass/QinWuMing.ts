import { Character } from "../Character";
import { Sex } from "../type";
import { YuSiWangPo } from "../../Skill/SkillClass/YuSiWangPo";

export class QinWuMing extends Character {
  constructor() {
    super({
      id: 42,
      name: "秦无命",
      sprite: "images/characters/NoPanting",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new YuSiWangPo(this)]);
  }
}
