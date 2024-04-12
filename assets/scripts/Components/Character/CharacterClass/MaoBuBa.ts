import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { QiHuoKeJu } from "../../Skill/SkillClass/QiHuoKeJu";

export class MaoBuBa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 4,
      name: "毛不拔",
      sprite: "images/characters/MaoBuBa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new QiHuoKeJu(this)]);
  }
}
