import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { BoAi } from "../../Skill/SkillClass/BoAi";

export class BaiCangLang extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 6,
      name: "白沧浪",
      sprite: "images/characters/BaiCangLang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new BoAi(this)]);
  }
}
