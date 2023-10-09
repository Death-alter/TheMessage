import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { BianZeTong } from "../../Skill/SkillClass/BianZeTong";

export class ChenDaEr extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 46,
      name: "陈大耳",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new BianZeTong(this)]);
  }
}
