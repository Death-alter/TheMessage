import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { JiZhi } from "../../Skill/SkillClass/JiZhi";
import { ChengZhi } from "../../Skill/SkillClass/ChengZhi";
import { WeiSheng } from "../../Skill/SkillClass/WeiSheng";

export class GuXiaoMeng extends Character {
  constructor() {
    super({
      id: 20,
      name: "顾小梦",
      sprite: "images/characters/GuXiaoMeng",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new JiZhi(this), new ChengZhi(this), new WeiSheng(this)]);
  }
}
