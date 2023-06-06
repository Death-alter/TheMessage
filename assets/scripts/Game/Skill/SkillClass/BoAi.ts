import { Skill } from "../Skill";

export class BoAi extends Skill {
  constructor() {
    super({
      name: "博爱",
      description:
        "出牌阶段限一次，你可以摸一张牌，然后可以将一张手牌交给另一名角色，若交给了女性角色或女性玩家，则你再摸一张牌。",
    });
  }

  init() {}

  dispose() {}
}
