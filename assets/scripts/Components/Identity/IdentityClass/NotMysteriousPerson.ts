import { Identity } from "../Identity";
import { IdentityType } from "../type";

//非神秘人
export class NotMysteriousPerson extends Identity {
  constructor() {
    super({
      type: IdentityType.GREEN,
      name: "神秘人",
      inverted: true,
    });
  }
}
