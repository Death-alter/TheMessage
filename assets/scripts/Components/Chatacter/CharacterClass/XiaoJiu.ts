import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { GuangFaBao } from "../../Skill/SkillClass/GuangFaBao";

export class XiaoJiu extends Character {
  constructor() {
    super({
      id: 27,
      name: "小九",
      sprite: "images/characters/XiaoJiu",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new GuangFaBao(this)]);
  }
}
