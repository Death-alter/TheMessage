import { Character } from "../Character";
import { Sex } from "../type";import { ZiZhengQingBai } from "../../Skill/SkillClass/ZiZhengQingBai";
import { YiWenAnHao } from "../../Skill/SkillClass/YiWenAnHao";

export class ChenAnNa extends Character {
  constructor() {
    super({
      id: 39,
      name: "陈安娜",
      sprite: "images/characters/ChenAnNa",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new ZiZhengQingBai(this), new YiWenAnHao(this)]);
  }
}
