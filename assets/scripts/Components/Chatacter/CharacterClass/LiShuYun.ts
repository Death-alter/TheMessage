import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { DingLun } from "../../Skill/SkillClass/DingLun";
import { ZhenLi } from "../../Skill/SkillClass/ZhenLi";

export class LiShuYun extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 43,
      name: "李书云",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new DingLun(this), new ZhenLi(this)]);
  }
}
