import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { JinKouYiKai } from "../../Skill/SkillClass/JinKouYiKai";

export class XuanQingZi extends Character {
  constructor() {
    super({
      id: 16,
      name: "玄青子",
      sprite: "images/characters/XuanQingZi",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JinKouYiKai(this)]);
  }
}
