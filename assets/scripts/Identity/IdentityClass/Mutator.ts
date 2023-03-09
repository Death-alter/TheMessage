import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Mutator extends MysteriousPerson {
  constructor() {
    super({
      name: "诱变者",
      secretTask: SecretTaskType.MUTATOR,
      secretTaskText: "当一名角色收集了三张红色情报或三张蓝色情报后，若其没有宣告胜利，则你胜利",
    });
  }
}
