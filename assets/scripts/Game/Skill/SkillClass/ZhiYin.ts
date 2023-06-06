import { Skill } from "../Skill";

export class ZhiYin extends Skill {
  constructor() {
    super({
      name: "知音",
      description: "你接收红色或蓝色情报后，你和传出者各摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
