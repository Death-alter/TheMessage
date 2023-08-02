import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Disturber extends MysteriousPerson {
  constructor() {
    super({
      name: "搅局者",
      secretTask: SecretTaskType.DISTURBER,
      secretTaskText: "你的回合结束时，除你以外的角色的红色和蓝色情报合计均不少于2张",
    });
  }
}
