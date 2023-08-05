import { SecretTaskType, IdentityType } from "./type";
import { Identity } from "./Identity";
import { Agent } from "./IdentityClass/Agent";
import { Collector } from "./IdentityClass/Collector";
import { Killer } from "./IdentityClass/Killer";
import { Lurker } from "./IdentityClass/Lurker";
import { Mutator } from "./IdentityClass/Mutator";
import { MysteriousPerson } from "./IdentityClass/MysteriousPerson";
import { Pioneer } from "./IdentityClass/Pioneer";
import { Stealer } from "./IdentityClass/Stealer";
import { Disturber } from "./IdentityClass/Disturber";
import { Sweeper } from "./IdentityClass/Sweeper";
import { NoIdentity } from "./IdentityClass/NoIdentity";

interface IdentityMapItem {
  class: { new (option?: any): Identity };
  subIdentity?: IdentityMap;
}

interface IdentityMap {
  [index: number]: IdentityMapItem;
}

const identityMap: IdentityMap = {};
const greenIdentity: IdentityMapItem = {
  class: MysteriousPerson,
  subIdentity: {},
};
const redIdentity = { class: Lurker };
const blueIdentity = { class: Agent };
const noIdentity = { class: NoIdentity };

identityMap[IdentityType.RED] = redIdentity;
identityMap[IdentityType.BLUE] = blueIdentity;
identityMap[IdentityType.GREEN] = greenIdentity;
identityMap[IdentityType.HAS_NO_IDENTITY] = noIdentity;

greenIdentity.subIdentity[SecretTaskType.KILLER] = { class: Killer };
greenIdentity.subIdentity[SecretTaskType.STEALER] = { class: Stealer };
greenIdentity.subIdentity[SecretTaskType.COLLECTOR] = { class: Collector };
greenIdentity.subIdentity[SecretTaskType.MUTATOR] = { class: Mutator };
greenIdentity.subIdentity[SecretTaskType.PIONEER] = { class: Pioneer };
greenIdentity.subIdentity[SecretTaskType.DISTURBER] = { class: Disturber };
greenIdentity.subIdentity[SecretTaskType.SWEEPER] = { class: Sweeper };

export function createIdentity(type: IdentityType, secretTask?: SecretTaskType): Identity {
  if (type === IdentityType.GREEN && secretTask != null) {
    return new identityMap[type].subIdentity[secretTask].class();
  } else if (identityMap[type]) {
    return new identityMap[type].class();
  } else {
    return new NoIdentity();
  }
}
