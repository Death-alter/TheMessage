import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JinKouYiKai } from "../../Skill/SkillClass/JinKouYiKai";

export class XuanQingZi extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 16,
      name: "玄青子",
      sprite: "images/characters/XuanQingZi",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new JinKouYiKai(this)]);
  }
}
