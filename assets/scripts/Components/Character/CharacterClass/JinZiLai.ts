import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { DuMing } from "../../Skill/SkillClass/DuMing";

export class JinZiLai extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 41,
      name: "金自来",
      sprite: "images/characters/JinZiLai",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new DuMing(this)]);
  }
}
