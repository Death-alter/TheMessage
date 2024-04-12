import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JieCheYunHuo } from "../../Skill/SkillClass/JieCheYunHuo";
import { GongRenYouZhiShi } from "../../Skill/SkillClass/GongRenYouZhiShi";

export class HuoCheSiJi extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 49,
      name: "火车司机",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JieCheYunHuo(this), new GongRenYouZhiShi(this)]);
  }
}
