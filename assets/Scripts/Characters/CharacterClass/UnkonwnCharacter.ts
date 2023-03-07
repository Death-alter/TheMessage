import { Character } from "../Character";
import { Sex, CharacterStatus } from "../types";
import { Skill } from "../../Skills/Skill";

export class UnkonwnCharacter extends Character {
  constructor() {
    super({
      id: 0,
      name: "",
      spirit: "images/characters/Unkonwn.jpg",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.UNKONWN,
      skills: [] as Skill[],
    });
  }
}
