import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { MianLiCangZhen } from "../../Skill/SkillClass/MianLiCangZhen";

export class ShaoXiu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 18,
      name: "邵秀",
      codeName: "大家闺秀",
      sprite: "images/characters/ShaoXiu",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new MianLiCangZhen(this)]);
  }
}
