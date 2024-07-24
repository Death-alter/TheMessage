import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { LengXueXunLian } from "../../Skill/SkillClass/LengXueXunLian";

export class HanMeiSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1014,
      name: "韩梅",
      codeName: "特务学员",
      sprite: "images/characters/HanMeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new LengXueXunLian(this)]);
  }
}
