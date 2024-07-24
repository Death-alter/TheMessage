import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YiHuaJieMu } from "../../Skill/SkillClass/YiHuaJieMu";

export class HanMei extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 14,
      name: "韩梅",
      codeName: "卖花女",
      sprite: "images/characters/HanMei",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new YiHuaJieMu(this)]);
  }
}
