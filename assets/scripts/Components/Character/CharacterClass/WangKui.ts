import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YiYaHuanYa } from "../../Skill/SkillClass/Yiyahuanya";

export class WangKui extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 12,
      name: "王魁",
      codeName: "黑帮打手",
      sprite: "images/characters/WangKui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new YiYaHuanYa(this)]);
  }
}
