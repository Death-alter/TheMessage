import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YouDiShenRu } from "../../Skill/SkillClass/YouDiShenRu";
import { JianDiFengXing } from "../../Skill/SkillClass/JianDiFengXing";

export class BianYunJiang extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 47,
      name: "边云疆",
      codeName: "军人",
      sprite: "images/characters/BianYunJiang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new YouDiShenRu(this), new JianDiFengXing(this)]);
  }
}
