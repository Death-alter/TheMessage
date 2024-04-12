import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { LianLuo } from "../../Skill/SkillClass/LianLuo";
import { MingEr } from "../../Skill/SkillClass/MingEr";

export class LaoBie extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 26,
      name: "老鳖",
      sprite: "images/characters/LaoBie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new LianLuo(this), new MingEr(this)]);
  }
}
