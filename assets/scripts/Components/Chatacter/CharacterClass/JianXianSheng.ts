import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { CongRongYingDui } from "../../Skill/SkillClass/CongRongYingDui";

export class JianXianSheng extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 37,
      name: "简先生",
      sprite: "images/characters/JianXianSheng",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new CongRongYingDui(this)]);
  }
}
