import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YingBian } from "../../Skill/SkillClass/YingBian";
import { YouDao } from "../../Skill/SkillClass/YouDao";

export class LiNingYuSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [new YingBian(), new YouDao()],
      gameObject: gameObject,
    });
  }
}
