import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { TanXuBianShi } from "../../Skill/SkillClass/TanXuBianShi";
import { CunBuBuRang } from "../../Skill/SkillClass/CunBuBuRang";

export class LingSuQiu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 44,
      name: "凌素秋",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new TanXuBianShi(this), new CunBuBuRang(this)]);
  }
}
