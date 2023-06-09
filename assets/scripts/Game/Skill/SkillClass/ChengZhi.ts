import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class ChengZhi extends Skill {
  constructor(character: Character) {
    super({
      name: "承志",
      character,
      description:
        "一名其他角色死亡前，若此角色牌已翻开，则你获得其所有手牌，并查看其身份牌，你可以获得该身份牌，并将你原本的身份牌面朝下移出游戏。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
