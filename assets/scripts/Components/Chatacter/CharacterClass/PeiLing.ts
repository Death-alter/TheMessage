import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { JiaoJi } from "../../Skill/SkillClass/JiaoJi";

export class PeiLing extends Character {
  constructor() {
    super({
      id: 8,
      name: "裴玲",
      sprite: "images/characters/PeiLing",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new JiaoJi(this)]);
  }
}
