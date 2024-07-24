import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JieDaoShaRen } from "../../Skill/SkillClass/JieDaoShaRen";

export class ShangYu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 30,
      name: "商玉",
      codeName: "酒楼掌柜",
      sprite: "images/characters/ShangYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new JieDaoShaRen(this)]);
  }
}
