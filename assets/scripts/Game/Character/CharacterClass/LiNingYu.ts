import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiuJi } from "../../Skill/SkillClass/JiuJi";
import { ChengFu } from "../../Skill/SkillClass/ChengFu";
import { YiXin } from "../../Skill/SkillClass/YiXin";

export class LiNingYu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 28,
      name: "李宁玉",
      sprite: "images/characters/LiNingYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [new JiuJi(), new ChengFu(), new YiXin()],
      gameObject: gameObject,
    });
  }
}
