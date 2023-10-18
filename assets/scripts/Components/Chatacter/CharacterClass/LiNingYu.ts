import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { JiuJi } from "../../Skill/SkillClass/JiuJi";
import { ChengFu } from "../../Skill/SkillClass/ChengFu";
import { YiXin } from "../../Skill/SkillClass/YiXin";

export class LiNingYu extends Character {
  constructor() {
    super({
      id: 28,
      name: "李宁玉",
      sprite: "images/characters/LiNingYu",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new JiuJi(this), new ChengFu(this), new YiXin(this)]);
  }
}
