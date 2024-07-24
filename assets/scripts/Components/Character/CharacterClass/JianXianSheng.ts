import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { CongRongYingDui } from "../../Skill/SkillClass/CongRongYingDui";

export class JianXianSheng extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 37,
      name: "简先生",
      codeName: "话剧演员",
      sprite: "images/characters/JianXianSheng",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new CongRongYingDui(this)]);
  }
}
