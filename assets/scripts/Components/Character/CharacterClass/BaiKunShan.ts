import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { DuJi } from "../../Skill/SkillClass/DuJi";

export class BaiKunShan extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 29,
      name: "白昆山",
      codeName: "军官",
      sprite: "images/characters/BaiKunShan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new DuJi(this)]);
  }
}
