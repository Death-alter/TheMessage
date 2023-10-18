import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { DuiZhengXiaoYao } from "../../Skill/SkillClass/DuiZhengXiaoYao";

export class HuangJiRen extends Character {
  constructor() {
    super({
      id: 9,
      name: "黄济仁",
      sprite: "images/characters/HuangJiRen",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new DuiZhengXiaoYao(this)]);
  }
}
