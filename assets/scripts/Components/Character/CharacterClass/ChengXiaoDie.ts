import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ZhiYin } from "../../Skill/SkillClass/ZhiYin";
import { JingMeng } from "../../Skill/SkillClass/JingMeng";

export class ChengXiaoDie extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 2,
      name: "程小蝶",
      sprite: "images/characters/ChengXiaoDie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new ZhiYin(this), new JingMeng(this)]);
  }
}
