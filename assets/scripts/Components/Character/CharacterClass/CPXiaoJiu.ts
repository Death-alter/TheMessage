import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { YiZhongRen } from "../../Skill/SkillClass/YiZhongRen";
import { ZhuangZhiManHuai } from "../../Skill/SkillClass/ZhuangZhiManHuai";

export class CPXiaoJiu extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 3027,
      name: "CP小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new ZhuangZhiManHuai(this), new YiZhongRen(this)]);
  }
}
