import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ZhuanJiao } from "../../Skill/SkillClass/ZhuanJiao";

export class BaiXiaoNian extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 25,
      name: "白小年",
      sprite: "images/characters/BaiXiaoNian",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new ZhuanJiao()],
      gameObject: gameObject,
    });
  }
}
