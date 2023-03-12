import { MysteriousPerson } from "./MysteriousPerson";
import { SecretTaskType } from "../type";

export class Stealer extends MysteriousPerson {
  constructor() {
    super({
      name: "簒夺者",
      secretTask: SecretTaskType.STEALER,
      secretTaskText: "你的回合中，有人宣胜，则你代替他胜利",
    });
  }
}
