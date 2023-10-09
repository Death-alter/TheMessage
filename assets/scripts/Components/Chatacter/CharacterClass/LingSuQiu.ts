import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { TanXuBianShi } from "../../Skill/SkillClass/TanXuBianShi";
import { CunBuBuRang } from "../../Skill/SkillClass/CunBuBuRang";

export class LingSuQiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 44,
      name: "凌素秋",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new TanXuBianShi(this), new CunBuBuRang(this)]);
  }
}
