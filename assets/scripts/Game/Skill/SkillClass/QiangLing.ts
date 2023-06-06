import { Skill } from "../Skill";

export class QiangLing extends Skill {
  constructor() {
    super({
      name: "强令",
      description:
        "你传出情报后，或你决定接收情报后，可以宣言至多两个卡牌名称。本回合中，所有角色均不能使用被宣言的卡牌。",
    });
  }

  init() {}

  dispose() {}
}
