import { _decorator, Component, Node, Label } from "cc";
import { ProcessEventCenter } from "../../../Event/EventTarget";
import { ProcessEvent } from "../../../Event/type";
import DynamicButtons from "../../../Components/Utils/DynamicButtons";
import { ProgressControl } from "../../../Components/Utils/ProgressControl";
const { ccclass, property } = _decorator;

@ccclass("Tooltip")
export class Tooltip extends Component {
  @property(Node)
  textNode: Node | null = null;
  @property(Node)
  buttonNode: Node | null = null;
  @property(Node)
  progressBar: Node | null = null;
  @property(Node)
  nextPhase: Node | null = null;

  private _showButton: boolean = true;
  public buttons: DynamicButtons;

  get showButton() {
    return this._showButton;
  }

  set showButton(flag: boolean) {
    this._showButton = flag;
    if (!flag) {
      this.nextPhase.active = false;
      this.buttonNode.active = false;
    } else {
      if (this.textNode.active) {
        this.nextPhase.active = true;
      }
      this.buttonNode.active = true;
    }
  }

  onLoad() {
    this.buttons = this.buttonNode.getComponent(DynamicButtons);
    this.nextPhase.active = false;
  }

  onEnable() {
    this.progressBar.active = false;
    this.hide();
    ProcessEventCenter.on(ProcessEvent.GET_AUTO_PLAY_STATUS, this.toogleShowButton, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.hide, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.GET_AUTO_PLAY_STATUS, this.toogleShowButton, this);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.hide, this);
  }

  startCountDown(second: number) {
    this.progressBar.getComponent(ProgressControl).startCountDown(second, () => {
      this.hide();
    });
    this.show();
  }

  setText(text?: string) {
    this.textNode.getComponent(Label).string = text;
  }

  toogleShowButton({ enable }) {
    this.showButton = !enable;
  }

  show() {
    this.textNode.active = true;
    if (this.showButton) this.buttonNode.active = true;
  }

  hide() {
    this.textNode.active = false;
    if (this.showButton) this.buttonNode.active = false;
  }

  showNextPhaseButton(text: string) {
    if (this.showButton) {
      this.nextPhase.getComponentInChildren(Label).string = text;
      this.nextPhase.active = true;
    }
  }

  hideNextPhaseButton() {
    this.nextPhase.getComponentInChildren(Label).string = "";
    this.nextPhase.active = false;
  }
}
