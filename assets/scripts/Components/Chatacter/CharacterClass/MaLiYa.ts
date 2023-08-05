import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { CangShenJiaoTang } from "../../Skill/SkillClass/CangShenJiaoTang";

export class MaLiYa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 31,
      name: "玛利亚",
      sprite: "images/characters/MaLiYa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new CangShenJiaoTang(this)]);
  }
}
