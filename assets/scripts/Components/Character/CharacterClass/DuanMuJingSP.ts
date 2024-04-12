import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { HouLaiRen } from "../../Skill/SkillClass/HouLaiRen";

export class DuanMuJingSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1022,
      name: "SP端木静",
      sprite: "images/characters/DuanMuJingSP",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new HouLaiRen(this)]);
  }
}
