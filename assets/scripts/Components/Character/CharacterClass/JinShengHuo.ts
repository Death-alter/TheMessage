import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JinShen } from "../../Skill/SkillClass/JinShen";

export class JinShengHuo extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JinShen(this)]);
  }
}
