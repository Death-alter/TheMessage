import { Skill } from "../Skill";
import { Character } from "../../Character/Character";

export class JinKouYiKai extends Skill {
  constructor(character: Character) {
    super({
      name: "金口一开",
      character,
      description:
        "你的争夺阶段限一次，你可以查看牌堆顶的一张牌，然后选择一项：<br/>♦你摸一张牌<br/>♦将牌堆顶的一张牌和待收情报面朝下互换。",
    });
  }

  init() {}

  dispose() {}
}
