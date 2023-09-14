import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { LianLuo2 } from "../../Skill/SkillClass/LianLuo2";
import { JieQu } from "../../Skill/SkillClass/JieQu";

export class AdultXiaoJiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 2027,
      name: "成年小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new LianLuo2(this), new JieQu(this)]);
  }
}
