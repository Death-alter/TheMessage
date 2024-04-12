import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiaoJi } from "../../Skill/SkillClass/JiaoJi";

export class PeiLing extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 8,
      name: "裴玲",
      sprite: "images/characters/PeiLing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills( [new JiaoJi(this)]);
  }
}
