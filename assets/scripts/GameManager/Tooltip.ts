import { _decorator, Component, Node, Label } from "cc";
import { ProgressControl } from "../UI/Game/ProgressControl";
import { TooltipText } from "./TooltipText";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../Event/type";
import { GamePhase } from "./type";
import { GamePhaseChange } from "../Event/GameEventType";
const { ccclass, property } = _decorator;

@ccclass("Tooltip")
export class Tooltip extends Component {
  @property(Node)
  textNode: Node | null = null;
  @property(Node)
  confirmButton: Node | null = null;
  @property(Node)
  cancelButton: Node | null = null;
  @property(Node)
  progressBar: Node | null = null;

  onEnable() {
    this.progressBar.active = false;
    this.hideText();
    this.hideButtons();

    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, (data: GamePhaseChange) => {
      const { turnPlayer, phase } = data;
      if (turnPlayer.id === 0) {
        switch (phase) {
          case GamePhase.DRAW_PHASE:
            this.setText(TooltipText.SELF_DRAW_PHASE);
            break;
          case GamePhase.MAIN_PHASE:
            this.setText(TooltipText.SELF_MAIN_PHASE);
            break;
          case GamePhase.SEND_PHASE:
            this.setText(TooltipText.SELF_SEND_PHASE);
            break;
          case GamePhase.FIGHT_PHASE:
            this.setText(TooltipText.SELF_FIGHT_PHASE);
            break;
          case GamePhase.RECEIVE_PHASE:
            this.setText(TooltipText.SELF_RECEIVE_PHASE);
            break;
        }
      }
    });

    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.hideText, this);
  }

  onDisable() {
    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.hideText);
  }

  startCoundDown(second: number, callback?: Function) {
    this.progressBar.getComponent(ProgressControl).startCoundDown(second, callback);
    this.showText();
  }

  setText(text: string) {
    this.textNode.getComponent(Label).string = text;
  }

  hideText() {
    this.textNode.active = false;
  }

  showText() {
    this.textNode.active = true;
  }

  showButtons() {
    this.confirmButton.active = true;
    this.cancelButton.active = true;
  }

  hideButtons() {
    this.confirmButton.active = false;
    this.cancelButton.active = false;
  }

  confirm({ TooltipText, confirmText, cancelText }) {
    return new Promise((reslove, reject) => {
      this.confirmButton.getChildByName("Label").getComponent(Label).string = confirmText;
      this.cancelButton.getChildByName("Label").getComponent(Label).string = cancelText;
      this.confirmButton.once(Node.EventType.TOUCH_END, () => {
        reslove(null);
      });
      this.cancelButton.once(Node.EventType.TOUCH_END, () => {
        reject(null);
      });
      this.setText(TooltipText);
    });
  }
}
