import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { HuoXin } from "../../Skill/SkillClass/HuoXin";

export class GaoQiaoZhiZi extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 36,
      name: "高桥智子",
      sprite: "images/characters/GaoQiaoZhiZi",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new HuoXin(this)]);
  }
}
