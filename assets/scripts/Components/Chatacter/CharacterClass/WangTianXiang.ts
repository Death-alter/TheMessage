import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JinBi } from "../../Skill/SkillClass/JinBi";

export class WangTianXiang extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 10,
      name: "王田香",
      sprite: "images/characters/WangTianXiang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new JinBi(this)]);
  }
}
