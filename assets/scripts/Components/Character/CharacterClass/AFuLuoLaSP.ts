import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YingBianZiRu } from "../../Skill/SkillClass/YingBianZiRu";
import { HunShuiMoYu } from "../../Skill/SkillClass/HunShuiMoYu";

export class AFuLuoLaSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1013,
      name: "阿芙罗拉",
      codeName: "苏联间谍",
      sprite: "images/characters/AFuLuoLaSP",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new YingBianZiRu(this), new HunShuiMoYu(this)]);
  }
}
