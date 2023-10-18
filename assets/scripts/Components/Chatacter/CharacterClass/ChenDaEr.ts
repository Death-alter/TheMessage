import { Character } from "../Character";
import { Sex } from "../type";import { BianZeTong } from "../../Skill/SkillClass/BianZeTong";

export class ChenDaEr extends Character {
  constructor() {
    super({
      id: 46,
      name: "陈大耳",
      sprite: "images/characters/NoPanting",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new BianZeTong(this)]);
  }
}
