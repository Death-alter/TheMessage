import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";

export class UnknownCharacter extends Character {
  constructor() {
    super({
      id: 0,
      name: "未知角色",
      sprite: "images/characters/Unknown",
      isHidden: true,
      sex: Sex.UNKNOWN,
    });
  }
}
