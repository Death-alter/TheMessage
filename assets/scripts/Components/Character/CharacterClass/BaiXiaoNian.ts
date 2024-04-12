import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ZhuanJiao } from "../../Skill/SkillClass/ZhuanJiao";

export class BaiXiaoNian extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 25,
      name: "白小年",
      sprite: "images/characters/BaiXiaoNian",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new ZhuanJiao(this)]);
  }
}
