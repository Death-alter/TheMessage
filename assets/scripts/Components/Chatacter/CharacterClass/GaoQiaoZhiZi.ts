import { Character } from "../Character";
import { Sex } from "../type";import { HuoXin } from "../../Skill/SkillClass/HuoXin";

export class GaoQiaoZhiZi extends Character {
  constructor() {
    super({
      id: 36,
      name: "高桥智子",
      sprite: "images/characters/GaoQiaoZhiZi",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new HuoXin(this)]);
  }
}
