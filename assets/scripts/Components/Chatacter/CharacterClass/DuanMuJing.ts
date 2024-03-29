import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { XinSiChao } from "../../Skill/SkillClass/XinSiChao";

export class DuanMuJing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 22,
      name: "端木静",
      sprite: "images/characters/DuanMuJing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new XinSiChao(this)]);
  }
}
