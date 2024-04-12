import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { SouJi } from "../../Skill/SkillClass/SouJi";

export class LiXing extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 11,
      name: "李醒",
      sprite: "images/characters/LiXing",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new SouJi(this)]);
  }
}
