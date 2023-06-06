import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ZhiYin } from "../../Skill/SkillClass/ZhiYin";
import { JingMeng } from "../../Skill/SkillClass/JingMeng";

export class ChengXiaoDie extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 2,
      name: "程小蝶",
      sprite: "images/characters/ChengXiaoDie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [new ZhiYin(), new JingMeng()],
      gameObject: gameObject,
    });
  }
}
