import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ZiZhengQingBai } from "../../Skill/SkillClass/ZiZhengQingBai";
import { YiWenAnHao } from "../../Skill/SkillClass/YiWenAnHao";

export class ChenAnNa extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 39,
      name: "陈安娜",
      codeName: "速记员",
      sprite: "images/characters/ChenAnNa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new ZiZhengQingBai(this), new YiWenAnHao(this)]);
  }
}
