import { Skill } from "../Skill";

export class LianLuo extends Skill {
  constructor() {
    super({
      name: "联络",
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }

  init() {}

  dispose() {}
}
