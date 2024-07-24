import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { CangShenJiaoTang } from "../../Skill/SkillClass/CangShenJiaoTang";

export class MaLiYa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 31,
      name: "玛利亚",
      codeName: "修女",
      sprite: "images/characters/MaLiYa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new CangShenJiaoTang(this)]);
  }
}
