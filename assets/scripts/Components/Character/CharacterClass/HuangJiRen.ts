import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { DuiZhengXiaoYao } from "../../Skill/SkillClass/DuiZhengXiaoYao";

export class HuangJiRen extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 9,
      name: "黄济仁",
      codeName: "药铺大夫",
      sprite: "images/characters/HuangJiRen",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new DuiZhengXiaoYao(this)]);
  }
}
