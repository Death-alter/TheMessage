import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { GuiZha } from "../../Skill/SkillClass/GuiZha";

export class FeiYuanLongChuan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 7,
      name: "肥圆龙川",
      sprite: "images/characters/FeiYuanLongChuan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new GuiZha()],
      gameObject: gameObject,
    });
  }
}
