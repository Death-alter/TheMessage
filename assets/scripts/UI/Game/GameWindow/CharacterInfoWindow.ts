import {
  _decorator,
  Component,
  Label,
  EventTouch,
  view,
  EventMouse,
  sys,
  Vec3,
  Size,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("CharacterInfoWindow")
export class CharacterInfoWindow extends Component {
  private size: Size;
  
  init() {
    this.size = view.getVisibleSize();
  }

  setText(text) {
    this.getComponentInChildren(Label).string = text;
    const textTransform = this.node.getChildByName("Label").getComponent(UITransform);
    const bgTransform = this.node.getChildByName("Background").getComponent(UITransform);
    const transform = this.node.getComponent(UITransform);
    this.scheduleOnce(() => {
      transform.width = textTransform.width;
      bgTransform.width = textTransform.width + 20;
      transform.height = textTransform.height;
      bgTransform.height = textTransform.height + 20;
    }, 0);
  }

  onMouseMove(event: EventMouse) {
    const mouseLocation = event.getUILocation();
    const transform = this.node.getComponent(UITransform);
    let x, y;
    if (mouseLocation.x < this.size.width / 2) {
      x = mouseLocation.x + 20;
    } else {
      x = mouseLocation.x - 20 - transform.width;
    }
    if (mouseLocation.y < this.size.height / 2) {
      y = mouseLocation.y + 20 + transform.height;
    } else {
      y = mouseLocation.y - 20;
    }

    this.node.worldPosition = new Vec3(x, y, this.node.worldPosition.z);
  }
}
