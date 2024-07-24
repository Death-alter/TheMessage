import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TanQiuZhenLi } from "../../Skill/SkillClass/TanQiuZhenLi";

export class LianYuanSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1003,
      name: "连鸢",
      codeName: "爱国作家",
      sprite: "images/characters/LianYuanSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new TanQiuZhenLi(this)]);
  }
}
