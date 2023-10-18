import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { JiSong } from "../../Skill/SkillClass/JiSong";

export class GuiJiao extends Character {
  constructor() {
    super({
      id: 17,
      name: "鬼脚",
      sprite: "images/characters/GuiJiao",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JiSong(this)]);
  }
}
