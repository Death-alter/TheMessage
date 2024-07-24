import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { XianFaZhiRen } from "../../Skill/SkillClass/XianFaZhiRen";

export class QianMin extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 32,
      name: "钱敏",
      codeName: "调查科员",
      sprite: "images/characters/QianMin",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new XianFaZhiRen(this)]);
  }
}
