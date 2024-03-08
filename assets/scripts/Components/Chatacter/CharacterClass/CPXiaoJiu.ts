import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YiZhongRen } from "../../Skill/SkillClass/YiZhongRen";
import { ZhuangZhiManHuai } from "../../Skill/SkillClass/ZhuangZhiManHuai";

export class CPXiaoJiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3027,
      name: "CP小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ZhuangZhiManHuai(this), new YiZhongRen(this)]);
  }
}
