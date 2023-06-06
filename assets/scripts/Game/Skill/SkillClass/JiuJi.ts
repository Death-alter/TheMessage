import { Skill } from "../Skill";

export class JiuJi extends Skill {
  constructor() {
    super({
      name: "就计",
      description:
        "你被【试探】【威逼】或【利诱】指定为目标后，可以翻开此角色牌，然后摸两张牌，并在触发此技能的卡牌结算后，将其加入你的手牌。",
    });
  }

  init() {}

  dispose() {}
}
