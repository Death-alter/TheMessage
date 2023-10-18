import { Character } from "../Character";
import { Sex } from "../type";import { GuiZha } from "../../Skill/SkillClass/GuiZha";

export class FeiYuanLongChuan extends Character {
  constructor() {
    super({
      id: 7,
      name: "肥原龙川",
      sprite: "images/characters/FeiYuanLongChuan",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new GuiZha(this)]);
  }
}
