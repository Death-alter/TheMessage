import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class ZhiYin extends Skill {
  constructor(character: Character) {
    super({
      name: "知音",
      character,
      description: "你接收红色或蓝色情报后，你和传出者各摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
