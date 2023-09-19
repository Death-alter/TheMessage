import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { LianLuo2 } from "../../Skill/SkillClass/LianLuo2";
import { ShunShiErWei } from "../../Skill/SkillClass/ShunShiErWei";

export class MiddleAgeXiaoJiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 2027,
      name: "中年小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new LianLuo2(this), new ShunShiErWei(this)]);
  }
}
