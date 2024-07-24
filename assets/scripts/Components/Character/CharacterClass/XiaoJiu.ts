import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { GuangFaBao } from "../../Skill/SkillClass/GuangFaBao";

export class XiaoJiu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 27,
      name: "小九",
      codeName: "报童",
      sprite: "images/characters/XiaoJiu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills( [new GuangFaBao(this)]);
  }
}
