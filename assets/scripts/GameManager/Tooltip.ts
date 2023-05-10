import { _decorator, Component, Node, Label, NodePool, Prefab, instantiate, Button } from "cc";
import { ProgressControl } from "../UI/Game/ProgressControl";
import { ProcessEventCenter } from "../Event/EventTarget";
import { ProcessEvent } from "../Event/type";
import DynamicButtons, { ButtonConfig } from "../Utils/DynamicButtons";
const { ccclass, property } = _decorator;

@ccclass("Tooltip")
export class Tooltip extends Component {
  @property(Node)
  textNode: Node | null = null;
  @property(Node)
  buttonNode: Node | null = null;
  @property(Node)
  progressBar: Node | null = null;

  private defaultText: string;
  public buttons: DynamicButtons;

  onLoad() {
    this.buttons = this.buttonNode.getComponent(DynamicButtons);
  }

  onEnable() {
    this.progressBar.active = false;
    this.hide();

    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.hide, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.hide);
  }

  startCoundDown(second: number, callback?: Function) {
    this.progressBar.getComponent(ProgressControl).startCoundDown(second, callback);
    this.show();
  }

  setText(text?: string) {
    this.textNode.getComponent(Label).string = text || this.defaultText;
  }

  setDefaultText(text: string) {
    this.defaultText = text;
    this.setText();
  }

  show() {
    this.textNode.active = true;
    this.buttonNode.active = true;
  }

  hide() {
    this.textNode.active = false;
    this.buttonNode.active = false;
  }
}
