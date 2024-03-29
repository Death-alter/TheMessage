import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { TouTian } from "../../Skill/SkillClass/TouTian";
import { HuanRi } from "../../Skill/SkillClass/HuanRi";

export class ZhengWenXian extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 15,
      name: "鄭文先",
      sprite: "images/characters/ZhengWenXian",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new TouTian(this), new HuanRi(this)]);
  }
}
