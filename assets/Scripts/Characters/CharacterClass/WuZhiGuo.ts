import { Character } from "../Character";
import { Sex, CharacterStatus } from "../types";
import { Skill } from "../../Skills/Skill";

export class WuZhiGuo extends Character {
  constructor() {
    super({
      id: 1,
      name: "吴志国",
      spirit: "images/characters/WuZhiGuo.jpg",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
