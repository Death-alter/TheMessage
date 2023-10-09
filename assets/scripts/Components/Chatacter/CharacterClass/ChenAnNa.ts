import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ZiZhengQingBai } from "../../Skill/SkillClass/ZiZhengQingBai";
import { YiWenAnHao } from "../../Skill/SkillClass/YiWenAnHao";

export class ChenAnNa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 39,
      name: "陈安娜",
      sprite: "images/characters/ChenAnNa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new ZiZhengQingBai(this), new YiWenAnHao(this)]);
  }
}
