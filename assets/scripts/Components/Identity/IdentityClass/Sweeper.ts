import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Sweeper extends MysteriousPerson {
  constructor() {
    super({
      name: "清道夫",
      secretTask: SecretTaskType.SWEEPER,
      secretTaskText: "你的回合中，一名红色和蓝色情报合计小于等于1张的人死亡",
    });
  }
}
