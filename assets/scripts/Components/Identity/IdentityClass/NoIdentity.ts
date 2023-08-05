import { Identity } from "../../../Components/Identity/Identity";
import { IdentityType } from "../type";

//失去身份
export class NoIdentity extends Identity {
  constructor() {
    super({
      type: IdentityType.HAS_NO_IDENTITY,
      name: "",
    });
  }
}
