import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { MiaoShou } from "../../Skill/SkillClass/MiaoShou";

export class AFuLuoLa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 13,
      name: "阿芙罗拉",
      sprite: "images/characters/AFuLuoLa",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new MiaoShou(this)]);
  }
}
