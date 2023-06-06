import { Skill } from "../Skill";

export class HuanRi extends Skill {
  constructor() {
    super({
      name: "换日",
      description: "你使用【调包】或【破译】后，可以将你的角色牌翻至面朝下。",
    });
  }

  init() {}

  dispose() {}
}
