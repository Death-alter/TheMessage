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
    }
  }

  onLoad() {
    this.buttons = this.buttonNode.getComponent(DynamicButtons);
    this.nextPhase.active = false;
    ProcessEventCenter.on(ProcessEvent.GET_AUTO_PLAY_STATUS, ({ enable }) => {
      this.showButton = !enable;
    });
  }

  onEnable() {
    this.progressBar.active = false;
    this.hide();

    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.hide, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.hide, this);
  }

  startCoundDown(second: number) {
    this.progressBar.getComponent(ProgressControl).startCoundDown(second, () => {
      this.hide();
    });
    this.show();
  }

  setText(text?: string) {
    this.textNode.getComponent(Label).string = text;
  }

  show() {
    this.textNode.active = true;
    if (this.showButton) this.buttonNode.active = true;
  }

  hide() {
    this.textNode.active = false;
    if (this.showButton) this.buttonNode.active = false;
  }

  showNextPhaseButton() {
    if (this.showButton) this.nextPhase.active = true;
  }

  hideNextPhaseButton() {
    if (this.showButton) this.nextPhase.active = false;
  }

  setNextPhaseButtonText(text: string) {
    this.nextPhase.getComponentInChildren(Label).string = text;
  }
}
