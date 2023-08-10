import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { GuanHai } from "../../Skill/SkillClass/GuanHai";
import { BiFeng } from "../../Skill/SkillClass/BiFeng";

export class ChiJingHai extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 33,
      name: "池镜海",
      sprite: "images/characters/ChiJingHai",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new GuanHai(this), new BiFeng(this)]);
  }
}
