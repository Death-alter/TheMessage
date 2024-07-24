import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { GuiZha } from "../../Skill/SkillClass/GuiZha";

export class FeiYuanLongChuan extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 7,
      name: "肥原龙川",
      codeName: "特务机关长",
      sprite: "images/characters/FeiYuanLongChuan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new GuiZha(this)]);
  }
}
