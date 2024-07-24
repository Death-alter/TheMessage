import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JinBi } from "../../Skill/SkillClass/JinBi";

export class WangTianXiang extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 10,
      name: "王田香",
      codeName: "特务处长",
      sprite: "images/characters/WangTianXiang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JinBi(this)]);
  }
}
