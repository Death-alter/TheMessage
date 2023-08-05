import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { DuJi } from "../../Skill/SkillClass/DuJi";

export class BaiKunShan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 29,
      name: "白昆山",
      sprite: "images/characters/BaiKunShan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new DuJi(this)]);
  }
}
