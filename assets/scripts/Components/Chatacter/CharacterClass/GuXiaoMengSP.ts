import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiBan } from "../../Skill/SkillClass/JiBan";

export class GuXiaoMengSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1028,
      name: "SP顾小梦",
      sprite: "images/characters/GuXiaoMengSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new JiBan(this)]);
  }
}
