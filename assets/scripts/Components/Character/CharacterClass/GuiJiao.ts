import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { JiSong } from "../../Skill/SkillClass/JiSong";

export class GuiJiao extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 17,
      name: "鬼脚",
      codeName: "黄包车夫",
      sprite: "images/characters/GuiJiao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new JiSong(this)]);
  }
}
