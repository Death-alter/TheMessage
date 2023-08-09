import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { TanQiuZhenLi } from "../../Skill/SkillClass/TanQiuZhenLi";

export class LianYuanSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1003,
      name: "SP连鸢",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new TanQiuZhenLi(this)]);
  }
}
