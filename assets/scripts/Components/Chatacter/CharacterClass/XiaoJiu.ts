import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { GuangFaBao } from "../../Skill/SkillClass/GuangFaBao";

export class XiaoJiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 27,
      name: "小九",
      sprite: "images/characters/XiaoJiu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills( [new GuangFaBao(this)]);
  }
}
