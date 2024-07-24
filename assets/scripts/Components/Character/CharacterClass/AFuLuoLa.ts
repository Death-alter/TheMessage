import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { MiaoShou } from "../../Skill/SkillClass/MiaoShou";

export class AFuLuoLa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 13,
      name: "阿芙罗拉",
      codeName: "赌场荷官",
      sprite: "images/characters/AFuLuoLa",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new MiaoShou(this)]);
  }
}
