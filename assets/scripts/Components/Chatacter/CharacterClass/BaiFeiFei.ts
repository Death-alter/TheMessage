import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { LianMin } from "../../Skill/SkillClass/LianMin";
import { FuHei } from "../../Skill/SkillClass/FuHei";

export class BaiFeiFei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 21,
      name: "白菲菲",
      sprite: "images/characters/BaiFeiFei",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new LianMin(this), new FuHei(this)]);
  }
}
