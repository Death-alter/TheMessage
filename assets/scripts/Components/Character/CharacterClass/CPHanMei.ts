import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { BaiYueGuang } from "../../Skill/SkillClass/BaiYueGuang";
import { AnCangShaJi } from "../../Skill/SkillClass/AnCangShaJi";

export class CPHanMei extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 3014,
      name: "CP韩梅",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new AnCangShaJi(this), new BaiYueGuang(this)]);
  }
}
