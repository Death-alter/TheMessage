import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class SouJi extends Skill {
  constructor(character: Character) {
    super({
      name: "搜缉",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后查看一名角色的手牌和代收情报，并且你可以选择其中任意张黑色牌，展示并加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
