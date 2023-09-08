import { Identity } from "../Identity";
import { IdentityType } from "../type";

//非潜伏战线
export class NotLurker extends Identity {
  constructor() {
    super({
      type: IdentityType.RED,
      name: "潜伏战线",
      inverted: true,
    });
  }
}
