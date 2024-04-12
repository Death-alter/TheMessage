import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { XinGeLianLuo } from "../../Skill/SkillClass/XinGeLianLuo";
import { HouZiQieXin } from "../../Skill/SkillClass/HouZiQieXin";

export class XiaoLingDang extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 45,
      name: "小铃铛",
      sprite: "images/characters/NoPanting_Famale",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new XinGeLianLuo(this), new HouZiQieXin(this)]);
  }
}
