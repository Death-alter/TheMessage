import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ShiSi } from "../../Skill/SkillClass/ShiSi";
import { RuGui } from "../../Skill/SkillClass/RuGui";

export class LaoHan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 24,
      name: "老汉",
      sprite: "images/characters/LaoHan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new ShiSi(this), new RuGui(this)]);
  }
}
