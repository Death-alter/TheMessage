import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ShiSi } from "../../Skill/SkillClass/ShiSi";
import { RuGui } from "../../Skill/SkillClass/RuGui";

export class LaoHan extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 24,
      name: "老汉",
      sprite: "images/characters/LaoHan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new ShiSi(this), new RuGui(this)]);
  }
}
