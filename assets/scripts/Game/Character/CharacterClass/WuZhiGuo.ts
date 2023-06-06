import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JianRen } from "../../Skill/SkillClass/JianRen";

export class WuZhiGuo extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1,
      name: "吴志国",
      sprite: "images/characters/WuZhiGuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new JianRen()],
      gameObject: gameObject,
    });
  }
}
