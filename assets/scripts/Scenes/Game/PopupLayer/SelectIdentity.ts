import { _decorator, Component, Node, instantiate, Prefab, NodeEventType, EventTouch } from "cc";
import { Identity } from "../../../Components/Identity/Identity";
import { IdentityEntity } from "../../../Components/Identity/IdentityEntity";
import { ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { ProcessEvent, UIEvent } from "../../../Event/type";
import { PlayerEntity } from "../../../Components/Player/PlayerEntity";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { NotAgent } from "../../../Components/Identity/IdentityClass/NotAgent";
import { NotLurker } from "../../../Components/Identity/IdentityClass/NotLurker";
import { NotMysteriousPerson } from "../../../Components/Identity/IdentityClass/NotMysteriousPerson";
import { IdentityType, SecretTaskType } from "../../../Components/Identity/type";
import { createIdentity } from "../../../Components/Identity";

const { ccclass, property } = _decorator;

@ccclass("SelectIdentity")
export class SelectIdentity extends Component {
  @property(Node)
  listNode: Node | null = null;
  @property(Prefab)
  identityPrefab: Prefab | null = null;

  public secretTaskList: SecretTaskType[] = [];

  init(): void {
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.initSecretTaskList, this);
    UIEventCenter.on(UIEvent.START_MARK_IDENTITY, this.show, this);
  }

  dispose() {
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.initSecretTaskList, this);
    UIEventCenter.off(UIEvent.START_MARK_IDENTITY, this.show, this);
  }

  initSecretTaskList(data) {
    this.secretTaskList = data.secretTaskList;
  }

  show({ identityList, playerEntity }: { identityList: Identity[]; playerEntity: PlayerEntity }) {
    let hasMysteriousPerson = false;
    for (const identity of identityList) {
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
      for (const task of this.secretTaskList) {
        identityList.push(createIdentity(IdentityType.GREEN, task));
      }
    }

    this.listNode.removeAllChildren();
    for (const identity of identityList) {
      const node = instantiate(this.identityPrefab);
      node.getComponent(IdentityEntity).data = identity;
      node.on(NodeEventType.TOUCH_END, (event: EventTouch) => {
        playerEntity.changeSelectedIdentity(identity);
      });
      this.listNode.addChild(node);
    }
    this.node.active = true;
    this.node.once(NodeEventType.TOUCH_END, (event: EventTouch) => {
      this.node.active = false;
    });
  }
}
