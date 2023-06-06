import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiSong } from "../../Skill/SkillClass/JiSong";

export class GuiJiao extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 17,
      name: "鬼脚",
      sprite: "images/characters/GuiJiao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new JiSong()],
      gameObject: gameObject,
    });
  }
}
