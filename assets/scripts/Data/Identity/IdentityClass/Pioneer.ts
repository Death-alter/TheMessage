import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Pioneer extends MysteriousPerson {
  constructor() {
    super({
      name: "先行者",
      secretTask: SecretTaskType.PIONEER,
      secretTaskText: "你死亡时，已收集了至少一张红色情报或蓝色情报",
    });
  }
}
