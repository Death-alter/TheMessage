import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiangJiJiuJi } from "../../Skill/SkillClass/JiangJiJiuJi";
import { LianXin } from "../../Skill/SkillClass/LianXin";

export class AdultHanMei extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 2014,
      name: "成年韩梅",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new LianXin(this), new JiangJiJiuJi(this)]);
  }
}
