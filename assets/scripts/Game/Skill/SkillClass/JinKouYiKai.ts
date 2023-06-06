import { Skill } from "../Skill";

export class JinKouYiKai extends Skill {
  constructor() {
    super({
      name: "金口一开",
      description:
        "你的争夺阶段限一次，你可以查看牌堆顶的一张牌，然后选择一项：<br/>♦你摸一张牌<br/>♦将牌堆顶的一张牌和待收情报面朝下互换。",
    });
  }

  init() {}

  dispose() {}
}
