import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class JiSong extends Skill {
  constructor(character: Character) {
    super({
      name: "急送",
      character,
      description:
        "争夺阶段限一次，你可以弃置两张手牌，或从你的情报区弃置一张非黑色情报，然后将待收情报移至一名角色面前。",
    });
  }

  init() {}

  dispose() {}
}
