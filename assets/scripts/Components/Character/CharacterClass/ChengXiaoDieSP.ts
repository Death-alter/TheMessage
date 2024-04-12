import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { GongFen } from "../../Skill/SkillClass/GongFen";

export class ChengXiaoDieSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1002,
      name: "SP程小蝶",
      sprite: "images/characters/ChengXiaoDieSP",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new GongFen(this)]);
  }
}
