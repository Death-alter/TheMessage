import { _decorator, Component, Node, instantiate, Prefab, NodeEventType, EventTouch } from "cc";
import { Identity } from "../../../Components/Identity/Identity";
import { IdentityObject } from "../../../Components/Identity/IdentityObject";
import { UIEventCenter } from "../../../Event/EventTarget";
import { UIEvent } from "../../../Event/type";

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

  show(identityList: Identity[]) {
    for (let identity of identityList) {
      this.listNode.removeAllChildren();
      const node = instantiate(this.identityPrefab);
      node.getComponent(IdentityObject).data = identity;
      this.listNode.addChild(node);
    }
    this.node.active = true;
    this.node.once(NodeEventType.TOUCH_END, (event: EventTouch) => {
      console.log(event);
      if (event.target === this.node) this.node.active = false;
    });
  }
}
