import { _decorator, color, Component, Label, Node, Sprite } from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("SelectBox")
export class SelectBox extends Component {
  @property(Node)
  layout: Node | null = null;
  @property(Label)
  buttonLabel: Label | null = null;

  protected onLoad(): void {
    const options = this.node.getChildByName("Options");
    options.active = false;
    this.node.getChildByName("Button").on(Node.EventType.TOUCH_END, (event) => {
      options.active = true;
    });
    this.node.getChildByName("Options").on(Node.EventType.TOUCH_END, (event) => {
      event.propagationStopped = true;
    });
    for (let i = 0; i < this.layout.children.length; i++) {
      const child = this.layout.children[i];
      //pc
      child.on(Node.EventType.MOUSE_ENTER, (event) => {
        child.getComponent(Sprite).color = color(140, 197, 255);
      });
      child.on(Node.EventType.MOUSE_LEAVE, (event) => {
        child.getComponent(Sprite).color = color("#cccccc");
      });
      //移动端
      child.on(Node.EventType.TOUCH_START, (event) => {
        child.getComponent(Sprite).color = color(140, 197, 255);
      });
      child.on(Node.EventType.TOUCH_END, (event) => {
        child.getComponent(Sprite).color = color("#cccccc");
        NetworkEventCenter.emit(NetworkEventToS.SET_ROOM_EXTENSION_TOS, { extension: i + 1 });
        options.active = false;
      });
    }
    this.node.parent.on(Node.EventType.TOUCH_END, (event) => {
      options.active = false;
    });
    ProcessEventCenter.on(ProcessEvent.SET_ROOM_EXTENSION, ({ extension }) => {
      const text = this.layout.children[extension - 1].getChildByName("Label").getComponent(Label).string;
      this.buttonLabel.getComponent(Label).string = text;
    });
  }

  protected onDisable(): void {
    NetworkEventCenter.off(NetworkEventToC.SET_ROOM_EXTENSION_TOC);
  }
}
