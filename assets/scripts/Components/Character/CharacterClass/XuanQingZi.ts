import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JinKouYiKai } from "../../Skill/SkillClass/JinKouYiKai";

export class XuanQingZi extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 16,
      name: "玄青子",
      sprite: "images/characters/XuanQingZi",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JinKouYiKai(this)]);
  }
}
