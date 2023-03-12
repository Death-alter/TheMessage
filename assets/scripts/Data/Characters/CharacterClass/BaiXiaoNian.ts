import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class BaiXiaoNian extends Character {
  constructor() {
    super({
      id: 25,
      name: "白小年",
      sprite: "images/characters/BaiXiaoNian",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
