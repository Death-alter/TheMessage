import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YingBianZiRu } from "../../Skill/SkillClass/YingBianZiRu";
import { HunShuiMoYu } from "../../Skill/SkillClass/HunShuiMoYu";

export class AFuLuoLaSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1013,
      name: "SP阿芙罗拉",
      sprite: "images/characters/AFuLuoLaSP",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new YingBianZiRu(this), new HunShuiMoYu(this)]);
  }
}
