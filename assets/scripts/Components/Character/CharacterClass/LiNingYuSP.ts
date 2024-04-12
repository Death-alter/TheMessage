import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YingBian } from "../../Skill/SkillClass/YingBian";
import { YouDao } from "../../Skill/SkillClass/YouDao";

export class LiNingYuSP extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new YingBian(this), new YouDao(this)]);
  }
}
