import { _decorator, Component, Node, Label } from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("GameButtons")
export class GameButtons extends Component {
  private _isAutoPlay: boolean = false;

  onLoad() {
    const autoPlayButton = this.node.getChildByName("AutoPlay");
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
  }
}
