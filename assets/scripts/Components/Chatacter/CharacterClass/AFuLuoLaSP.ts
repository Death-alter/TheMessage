import { Character } from "../Character";
import { Sex } from "../type";import { YingBianZiRu } from "../../Skill/SkillClass/YingBianZiRu";
import { HunShuiMoYu } from "../../Skill/SkillClass/HunShuiMoYu";

export class AFuLuoLaSP extends Character {
  constructor() {
    super({
      id: 1013,
      name: "SP阿芙罗拉",
      sprite: "images/characters/AFuLuoLaSP",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new YingBianZiRu(this), new HunShuiMoYu(this)]);
  }
}
