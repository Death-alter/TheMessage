import { Character } from "../Character";
import { Sex } from "../type";import { DuMing } from "../../Skill/SkillClass/DuMing";

export class JinZiLai extends Character {
  constructor() {
    super({
      id: 41,
      name: "金自来",
      sprite: "images/characters/JinZiLai",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new DuMing(this)]);
  }
}
