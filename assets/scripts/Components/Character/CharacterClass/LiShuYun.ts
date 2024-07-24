import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { DingLun } from "../../Skill/SkillClass/DingLun";
import { ZhenLi } from "../../Skill/SkillClass/ZhenLi";

export class LiShuYun extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 43,
      name: "李书云",
      codeName: "教授",
      sprite: "images/characters/LiShuYun",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new DingLun(this), new ZhenLi(this)]);
  }
}
