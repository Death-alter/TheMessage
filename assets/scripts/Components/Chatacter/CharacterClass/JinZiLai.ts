import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { DuMing } from "../../Skill/SkillClass/DuMing";

export class JinZiLai extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 41,
      name: "金自来",
      sprite: "images/characters/JinZiLai",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new DuMing(this)]);
  }
}
