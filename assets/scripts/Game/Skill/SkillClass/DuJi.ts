import { Character } from "../../Character/Character";
import { Skill } from "../Skill";

export class DuJi extends Skill {
  constructor(character: Character) {
    super({
      name: "毒计",
      character,
      description:
        "你的争夺阶段限一次，你可以翻开此角色牌，然后指定两名其他角色，令他们互相抽取对方的一张手牌并展示之，你将展示的牌加入你的手牌，若展示的是黑色牌，你可以改为令抽取者选择一项：<br/>♦将其置入自己的情报区。<br/>♦将其置入对方的情报区。",
    });
  }

  init() {}

  dispose() {}
}
