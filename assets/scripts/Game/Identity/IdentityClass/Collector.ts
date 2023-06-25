import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Collector extends MysteriousPerson {
  constructor() {
    super({
      name: "双面间谍",
      secretTask: SecretTaskType.COLLECTOR,
      secretTaskText: "你获得3张红色情报或者3张蓝色情报",
    });
  }
}
