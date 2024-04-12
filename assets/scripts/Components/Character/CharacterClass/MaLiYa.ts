import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { CangShenJiaoTang } from "../../Skill/SkillClass/CangShenJiaoTang";

export class MaLiYa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 31,
      name: "玛利亚",
      sprite: "images/characters/MaLiYa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new CangShenJiaoTang(this)]);
  }
}
