import { _decorator, Component, Label, view, EventMouse, Vec3, Size, UITransform, EventTouch } from "cc";
import { Character } from "../../../Components/Chatacter/Character";
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

  setCharacterInfo(character: Character) {
    let str = character.name;
    for (let skill of character.skills) {
      str += "\n" + skill.name;
      str += "\n" + skill.description;
    }
    this.setText(str);
  }

  setPosition(event: EventMouse | EventTouch) {
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
