import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TouTian } from "../../Skill/SkillClass/TouTian";
import { HuanRi } from "../../Skill/SkillClass/HuanRi";

export class ZhengWenXian extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 15,
      name: "鄭文先",
      sprite: "images/characters/ZhengWenXian",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new TouTian(this), new HuanRi(this)]);
  }
}
