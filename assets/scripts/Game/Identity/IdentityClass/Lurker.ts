import { Identity } from "../Identity";
import { IdentityType } from "../type";

//潜伏战线
export class Lurker extends Identity {
  constructor() {
    super({
      type: IdentityType.RED,
      name: "潜伏战线",
    });
  }
}
