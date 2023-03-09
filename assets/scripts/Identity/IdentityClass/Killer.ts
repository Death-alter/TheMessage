import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Killer extends MysteriousPerson {
  constructor() {
    super({
      name: "镇压者",
      secretTask: SecretTaskType.KILLER,
      secretTaskText: "你的回合中，一名红色和蓝色情报合计不少于2张的人死亡",
    });
  }
}
