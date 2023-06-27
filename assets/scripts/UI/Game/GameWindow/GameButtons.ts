import { _decorator, Component, Node, Label} from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("GameButtons")
export class GameButtons extends Component {
  @property(Node)
  logHistory: Node | null = null;

  private _isAutoPlay: boolean = false;

  onEnable() {
    const autoPlayButton = this.node.getChildByName("AutoPlay");
    const logButton = this.node.getChildByName("Log");
    autoPlayButton.on(Node.EventType.TOUCH_END, () => {
      if (this._isAutoPlay) {
        NetworkEventCenter.emit(NetworkEventToS.AUTO_PLAY_TOS, { enable: false });
      } else {
        NetworkEventCenter.emit(NetworkEventToS.AUTO_PLAY_TOS, { enable: true });
      }
    });
    ProcessEventCenter.on(ProcessEvent.GET_AUTO_PLAY_STATUS, (data) => {
      this._isAutoPlay = data.enable;
      if (data.enable) {
        autoPlayButton.getComponentInChildren(Label).string = "取消托管";
      } else {
        autoPlayButton.getComponentInChildren(Label).string = "托管";
      }
    });
    logButton.on(Node.EventType.TOUCH_END, () => {
      this.logHistory.active = true;
    });
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.GET_AUTO_PLAY_STATUS);
  }
}
