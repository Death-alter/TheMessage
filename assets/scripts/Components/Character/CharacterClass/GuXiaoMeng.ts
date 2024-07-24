import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiZhi } from "../../Skill/SkillClass/JiZhi";
import { ChengZhi } from "../../Skill/SkillClass/ChengZhi";
import { WeiSheng } from "../../Skill/SkillClass/WeiSheng";

export class GuXiaoMeng extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 20,
      name: "顾小梦",
      codeName: "译电科科员",
      sprite: "images/characters/GuXiaoMeng",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new JiZhi(this), new ChengZhi(this), new WeiSheng(this)]);
  }
}
