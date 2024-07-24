import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YunChouWeiWo } from "../../Skill/SkillClass/YunChouWeiWo";

export class LaoHu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 38,
      name: "老虎",
      codeName: "地下领袖",
      sprite: "images/characters/LaoHu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new YunChouWeiWo(this)]);
  }
}
