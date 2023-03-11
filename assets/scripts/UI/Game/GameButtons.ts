import { _decorator, Component, Node, Label } from "cc";
import EventTarget from "../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("GameButtons")
export class GameButtons extends Component {
  private _isAutoPlay: boolean = false;

  onLoad() {
    const autoPlayButton = this.node.getChildByName("AutoPlay");
    autoPlayButton.on(Node.EventType.TOUCH_END, () => {
      if (this._isAutoPlay) {
        EventTarget.emit(NetworkEventToS.AUTO_PLAY_TOS, { enable: false });
        EventTarget.once(ProcessEvent.GET_AUTO_PLAY_STATUS, (data) => {
          autoPlayButton.getComponentInChildren(Label).string = "托管";
          this._isAutoPlay = data.enable;
        });
      } else {
        EventTarget.emit(NetworkEventToS.AUTO_PLAY_TOS, { enable: true });
        EventTarget.once(ProcessEvent.GET_AUTO_PLAY_STATUS, (data) => {
          autoPlayButton.getComponentInChildren(Label).string = "取消托管";
          this._isAutoPlay = data.enable;
        });
      }
    });
  }
}
