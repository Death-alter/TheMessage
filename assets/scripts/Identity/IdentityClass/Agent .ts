import { Identity } from "../Identity";
import { IdentityType } from "../type";

//特工机关
export class Agent extends Identity {
  constructor() {
    super({
      type: IdentityType.BLUE,
      name: "特工机关",
      color: "#2932e1",
    });
  }
}
