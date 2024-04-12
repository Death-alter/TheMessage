import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { LianXin } from "../../Skill/SkillClass/LianXin";
import { ShunShiErWei } from "../../Skill/SkillClass/ShunShiErWei";

export class AdultXiaoJiu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 2027,
      name: "成年小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new LianXin(this), new ShunShiErWei(this)]);
  }
}
