import { Skill } from "../Skill";

export class Yiyahuanya extends Skill {
  constructor() {
    super({
      name: "以牙还牙",
      description: "你接收黑色情报后，可以将一张黑色手牌置入情报传出者或其相邻角色的情报区，然后摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
