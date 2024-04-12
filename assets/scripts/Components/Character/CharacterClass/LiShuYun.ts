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
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new DingLun(this), new ZhenLi(this)]);
  }
}
