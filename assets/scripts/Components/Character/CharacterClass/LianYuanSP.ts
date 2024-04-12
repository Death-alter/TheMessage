import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TanQiuZhenLi } from "../../Skill/SkillClass/TanQiuZhenLi";

export class LianYuanSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1003,
      name: "SP连鸢",
      sprite: "images/characters/LianYuanSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new TanQiuZhenLi(this)]);
  }
}
