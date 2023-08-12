import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { HouLaiRen } from "../../Skill/SkillClass/HouLaiRen";

export class DuanMuJingSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1022,
      name: "SP端木静",
      sprite: "images/characters/DuanMuJingSP",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new HouLaiRen(this)]);
  }
}
