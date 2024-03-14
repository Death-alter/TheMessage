import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { BaiYueGuang } from "../../Skill/SkillClass/BaiYueGuang";
import { AnCangShaJi } from "../../Skill/SkillClass/AnCangShaJi";

export class CPHanMei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3014,
      name: "CP韩梅",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new AnCangShaJi(this), new BaiYueGuang(this)]);
  }
}
