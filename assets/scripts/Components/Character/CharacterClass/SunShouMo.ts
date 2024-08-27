import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { XiangJinSiSuo } from "../../Skill/SkillClass/XiangJinSiSuo";
import { QiangYingXiaLing } from "../../Skill/SkillClass/QiangYingXiaLing";

export class SunShouMo extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 48,
      name: "孙守謨",
      codeName: "参谋",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new XiangJinSiSuo(this), new QiangYingXiaLing(this)]);
  }
}
