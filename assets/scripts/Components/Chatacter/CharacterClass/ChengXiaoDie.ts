import { Character } from "../../../Components/Chatacter/Character";
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
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ZhiYin(this), new JingMeng(this)]);
  }
}
