import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { MiaoBiQiaoBian } from "../../Skill/SkillClass/MiaoBiQiaoBian";

export class LianYuan extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 3,
      name: "连鸢",
      sprite: "images/characters/LianYuan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new MiaoBiQiaoBian(this)]);
  }
}
