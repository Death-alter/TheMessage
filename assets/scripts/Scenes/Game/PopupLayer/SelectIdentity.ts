import { _decorator, Component, Node, instantiate, Prefab, NodeEventType, EventTouch } from "cc";
import { Identity } from "../../../Components/Identity/Identity";
import { IdentityObject } from "../../../Components/Identity/IdentityObject";
import { UIEventCenter } from "../../../Event/EventTarget";
import { UIEvent } from "../../../Event/type";
import { PlayerObject } from "../../../Components/Player/PlayerObject";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { NotAgent } from "../../../Components/Identity/IdentityClass/NotAgent";
import { NotLurker } from "../../../Components/Identity/IdentityClass/NotLurker";
import { NotMysteriousPerson } from "../../../Components/Identity/IdentityClass/NotMysteriousPerson";
import { Killer } from "../../../Components/Identity/IdentityClass/Killer";
import { Stealer } from "../../../Components/Identity/IdentityClass/Stealer";
import { Collector } from "../../../Components/Identity/IdentityClass/Collector";
import { Pioneer } from "../../../Components/Identity/IdentityClass/Pioneer";
import { Disturber } from "../../../Components/Identity/IdentityClass/Disturber";
import { Sweeper } from "../../../Components/Identity/IdentityClass/Sweeper";
import { Mutator } from "../../../Components/Identity/IdentityClass/Mutator";

const { ccclass, property } = _decorator;

@ccclass("SelectIdentity")
export class SelectIdentity extends Component {
  @property(Node)
  listNode: Node | null = null;
  @property(Prefab)
  identityPrefab: Prefab | null = null;

  init(): void {
    UIEventCenter.on(UIEvent.START_MARK_IDENTITY, this.show, this);
  }

  dispose() {
    UIEventCenter.off(UIEvent.START_MARK_IDENTITY, this.show, this);
  }

  show({ identityList, playerObject }: { identityList: Identity[]; playerObject: PlayerObject }) {
    let hasMysteriousPerson = false;
    for (let identity of identityList) {
      if (identity instanceof MysteriousPerson) {
        hasMysteriousPerson = true;
        break;
      }
    }
    if (identityList.length === 3) {
      identityList.push(new NotLurker());
      identityList.push(new NotAgent());
      identityList.push(new NotMysteriousPerson());
    }
    if (hasMysteriousPerson) {
      identityList.push(new Killer());
      identityList.push(new Stealer());
      identityList.push(new Collector());
      identityList.push(new Mutator());
      identityList.push(new Pioneer());
      identityList.push(new Disturber());
      identityList.push(new Sweeper());
    }

    this.listNode.removeAllChildren();
    for (let identity of identityList) {
      const node = instantiate(this.identityPrefab);
      node.getComponent(IdentityObject).data = identity;
      node.on(NodeEventType.TOUCH_END, (event: EventTouch) => {
        playerObject.changeSelectedIdentity(identity);
      });
      this.listNode.addChild(node);
    }
    this.node.active = true;
    this.node.once(NodeEventType.TOUCH_END, (event: EventTouch) => {
      this.node.active = false;
    });
  }
}
