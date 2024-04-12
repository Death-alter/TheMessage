import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ChiZiZhiXin } from "../../Skill/SkillClass/ChiZiZhiXin";

export class XiaoJiuSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1027,
      name: "SP小九",
      sprite: "images/characters/XiaoJiuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new ChiZiZhiXin(this)]);
  }
}
