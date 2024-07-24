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
      codeName: "杂耍艺人",
      sprite: "images/characters/XiaoLingDang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FEMALE,
      entity: entity,
    });
    this.setSkills([new XinGeLianLuo(this), new HouZiQieXin(this)]);
  }
}
