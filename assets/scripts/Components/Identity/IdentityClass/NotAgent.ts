import { Identity } from "../Identity";
import { IdentityType } from "../type";

//非特工机关
export class NotAgent extends Identity {
  constructor() {
    super({
      type: IdentityType.BLUE,
      name: "特工机关",
      inverted: true,
    });
  }
}
