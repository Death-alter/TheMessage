import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { XinSiChao } from "../../Skill/SkillClass/XinSiChao";

export class DuanMuJing extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 22,
      name: "端木静",
      codeName: "学生",
      sprite: "images/characters/DuanMuJing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new XinSiChao(this)]);
  }
}
