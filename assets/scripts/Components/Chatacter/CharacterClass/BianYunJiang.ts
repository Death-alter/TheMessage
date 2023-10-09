import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YouDiShenRu } from "../../Skill/SkillClass/YouDiShenRu";
import { JianDiFengXing } from "../../Skill/SkillClass/JianDiFengXing";

export class BianYunJiang extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 47,
      name: "边云疆",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new YouDiShenRu(this), new JianDiFengXing(this)]);
  }
}
