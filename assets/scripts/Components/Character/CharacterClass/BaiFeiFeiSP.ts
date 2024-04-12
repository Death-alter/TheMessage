import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TaoQu } from "../../Skill/SkillClass/TaoQu";

export class BaiFeiFeiSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1021,
      name: "SP白菲菲",
      sprite: "images/characters/BaiFeiFeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new TaoQu(this)]);
  }
}
