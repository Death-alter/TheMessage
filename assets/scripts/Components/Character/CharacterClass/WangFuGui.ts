import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiangHuLing } from "../../Skill/SkillClass/JiangHuLing";

export class WangFuGui extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 23,
      name: "王富贵",
      sprite: "images/characters/WangFuGui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JiangHuLing(this)]);
  }
}
