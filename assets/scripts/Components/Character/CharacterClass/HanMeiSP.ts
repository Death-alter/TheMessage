import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { LengXueXunLian } from "../../Skill/SkillClass/LengXueXunLian";

export class HanMeiSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1014,
      name: "SP韩梅",
      sprite: "images/characters/HanMeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new LengXueXunLian(this)]);
  }
}
