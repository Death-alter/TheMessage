import { Skill } from "../Skill";

export class JieDaoShaRen extends Skill {
  constructor() {
    super({
      name: "借刀杀人",
      description:
        "争夺阶段，你可以翻开此角色牌，然后抽取另一名角色的一张手牌并展示之。若展示的牌是：黑色，则你可以将其置入一名角色的情报区，并将你的角色牌翻至面朝下；非黑色，则你摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
