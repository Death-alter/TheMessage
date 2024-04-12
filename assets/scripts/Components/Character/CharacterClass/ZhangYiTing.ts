import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { QiangLing } from "../../Skill/SkillClass/QiangLing";

export class ZhangYiTing extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 5,
      name: "张一挺",
      sprite: "images/characters/ZhangYiTing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new QiangLing(this)]);
  }
}
