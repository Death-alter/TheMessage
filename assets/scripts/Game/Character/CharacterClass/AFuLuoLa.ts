import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { MiaoShou } from "../../Skill/SkillClass/MiaoShou";

export class AFuLuoLa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 13,
      name: "阿芙罗拉",
      sprite: "images/characters/AFuLuoLa",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [new MiaoShou()],
      gameObject: gameObject,
    });
  }
}
