import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { LianLuo } from "../../Skill/SkillClass/LianLuo";
import { MingEr } from "../../Skill/SkillClass/MingEr";

export class LaoBie extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 26,
      name: "老鳖",
      sprite: "images/characters/LaoBie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new LianLuo(this), new MingEr(this)]);
  }
}
