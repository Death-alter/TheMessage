import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiBan } from "../../Skill/SkillClass/JiBan";

export class GuXiaoMengSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1020,
      name: "SP顾小梦",
      codeName: "译电科科员",
      sprite: "images/characters/GuXiaoMengSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new JiBan(this)]);
  }
}
