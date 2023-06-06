import { Skill } from "../Skill";

export class MianLiCangZhen extends Skill {
  constructor() {
    super({
      name: "绵里藏针",
      description: "你传出的情报被接收后，可以将一张黑色手牌置入接收者的情报区，然后摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
