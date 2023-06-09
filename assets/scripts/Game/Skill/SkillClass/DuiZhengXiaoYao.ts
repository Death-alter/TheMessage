import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class DuiZhengXiaoYao extends Skill {
  constructor(character: Character) {
    super({
      name: "对症下药",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后摸三张牌，并且你可以展示两张含有相同颜色的手牌，然后从一名角色的情报区，弃置一张对应颜色的情报。",
    });
  }

  init() {}

  dispose() {}
}
