import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class SPLiNingYu extends Character {
  constructor() {
    super({
      id: 1028,
      name: "SP李宁玉",
      spirit: "images/characters/LiNingYuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
