import { Skill } from "../Skill";

export class WeiSheng extends Skill {
  constructor() {
    super({
      name: "尾声",
      description: "你获得胜利时，没有身份牌的玩家与你一同获得胜利。",
    });
  }

  init() {}

  dispose() {}

  onUse() {}
}
