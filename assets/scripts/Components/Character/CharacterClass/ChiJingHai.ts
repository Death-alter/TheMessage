import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { GuanHai } from "../../Skill/SkillClass/GuanHai";
import { BiFeng } from "../../Skill/SkillClass/BiFeng";

export class ChiJingHai extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 33,
      name: "池镜海",
      codeName: "破译专家",
      sprite: "images/characters/ChiJingHai",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new GuanHai(this), new BiFeng(this)]);
  }
}
