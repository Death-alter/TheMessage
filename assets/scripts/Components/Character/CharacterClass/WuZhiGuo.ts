import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JianRen } from "../../Skill/SkillClass/JianRen";

export class WuZhiGuo extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1,
      name: "吴志国",
      sprite: "images/characters/WuZhiGuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills( [new JianRen(this)]);
  }
}
