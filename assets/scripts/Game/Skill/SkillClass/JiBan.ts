import { Skill } from "../Skill";

export class JiBan extends Skill {
  constructor() {
    super({
      name: "羁绊",
      description: "出牌阶段限一次，可以摸两张牌，然后将至少一张手牌交给另一名角色。",
    });
  }

  init() {}

  dispose() {}
}
