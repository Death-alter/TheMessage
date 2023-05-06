import { _decorator, Component, Node, Label, NodePool, Prefab, instantiate, Button, EventHandler } from "cc";
import { ProgressControl } from "../UI/Game/ProgressControl";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../Event/type";
import { GamePhase } from "./type";
const { ccclass, property } = _decorator;

interface ButtonConfig {
  text: string;
  onclick: () => void;
  disabled?: boolean;
}

@ccclass("Tooltip")
export class Tooltip extends Component {
  @property(Node)
  textNode: Node | null = null;
  @property(Node)
  buttons: Node | null = null;
  @property(Node)
  progressBar: Node | null = null;
  @property(Prefab)
  buttonPrefab: Prefab | null = null;

  private buttonPool = new NodePool();
  private defaultText: string;

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
    this.buttons.active = true;
  }

  hide() {
    this.textNode.active = false;
    this.buttons.active = false;
  }

  setButtons(buttons: ButtonConfig[]) {
    this.buttons.removeAllChildren();
    const l = buttons.length - this.buttons.children.length;
    if (l >= 0) {
      for (let i = 0; i < l; i++) {
        let button = this.buttonPool.get();
        if (!button) {
          button = instantiate(this.buttonPrefab);
        }
        this.buttons.addChild(button);
      }
    } else {
      for (let i = buttons.length; i < this.buttons.children.length; i++) {
        this.buttonPool.put(this.buttons.children[i]);
      }
    }
    for (let i = 0; i < buttons.length; i++) {
      const button = this.buttons.children[i];
      const config = buttons[i];
      button.getChildByName("Label").getComponent(Label).string = config.text;
      button.off(Node.EventType.TOUCH_END);
      button.on(Node.EventType.TOUCH_END, config.onclick, button);
      button.getComponent(Button).interactable = !buttons[i].disabled;
    }
    return this.buttons.children;
  }

  confirm(confirmText, cancelText) {
    return new Promise((reslove, reject) => {
      const buttons = this.setButtons([
        {
          text: confirmText,
          onclick: () => {
            reslove(buttons);
          },
        },
        {
          text: cancelText,
          onclick: () => {
            reject(buttons);
          },
        },
      ]);
    });
  }
}
