import { _decorator, Component, Node, Prefab, instantiate, Vec3, find } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SettingButton")
export class SettingButton extends Component {
  @property(Prefab)
  settingPrefab: Prefab | null = null;

  public settingNode: Node = null;

  onLoad() {
    this.settingNode = instantiate(this.settingPrefab);
    this.settingNode.active = false;
    this.settingNode.setParent(find("Resident"));
    this.settingNode.worldPosition = new Vec3(640, 360, 0);
    this.node.on(Node.EventType.TOUCH_END, (event) => {
      this.settingNode.active = !this.settingNode.active;
    });
  }
}
