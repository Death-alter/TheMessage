import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { MianLiCangZhen } from "../../Skill/SkillClass/MianLiCangZhen";

export class ShaoXiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 18,
      name: "邵秀",
      sprite: "images/characters/ShaoXiu",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new MianLiCangZhen(this)]);
  }
}
