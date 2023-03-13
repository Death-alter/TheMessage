import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class GuiJiao extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 17,
      name: "鬼脚",
      sprite: "images/characters/GuiJiao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
