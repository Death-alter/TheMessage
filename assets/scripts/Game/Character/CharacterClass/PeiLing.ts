import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiaoJi } from "../../Skill/SkillClass/JiaoJi";

export class PeiLing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 8,
      name: "裴玲",
      sprite: "images/characters/PeiLing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [new JiaoJi()],
      gameObject: gameObject,
    });
  }
}
