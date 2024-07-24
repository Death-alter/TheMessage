import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { BaiYueGuang } from "../../Skill/SkillClass/BaiYueGuang";
import { AnCangShaJi } from "../../Skill/SkillClass/AnCangShaJi";

export class CPHanMei extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 3014,
      name: "韩梅",
      codeName: "军统特务",
      sprite: "images/characters/CPHanMei",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new AnCangShaJi(this), new BaiYueGuang(this)]);
  }
}
