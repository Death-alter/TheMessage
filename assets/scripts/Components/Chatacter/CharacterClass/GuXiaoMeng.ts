import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiZhi } from "../../Skill/SkillClass/JiZhi";
import { ChengZhi } from "../../Skill/SkillClass/ChengZhi";
import { WeiSheng } from "../../Skill/SkillClass/WeiSheng";

export class GuXiaoMeng extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 20,
      name: "顾小梦",
      sprite: "images/characters/GuXiaoMeng",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new JiZhi(this), new ChengZhi(this), new WeiSheng(this)]);
  }
}
