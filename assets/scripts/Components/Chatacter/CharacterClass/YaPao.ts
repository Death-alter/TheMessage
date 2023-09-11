import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ShouKouRuPing } from "../../Skill/SkillClass/ShouKouRuPing";

export class YaPao extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 40,
      name: "哑炮",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ShouKouRuPing(this)]);
  }
}
