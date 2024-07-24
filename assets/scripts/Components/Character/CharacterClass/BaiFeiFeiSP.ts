import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TaoQu } from "../../Skill/SkillClass/TaoQu";

export class BaiFeiFeiSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1021,
      name: "白菲菲",
      codeName:"日本间谍",
      sprite: "images/characters/BaiFeiFeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new TaoQu(this)]);
  }
}
