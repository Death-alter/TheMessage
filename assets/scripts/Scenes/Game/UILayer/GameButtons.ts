import { _decorator, Component, Node, Label, find, director } from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { DataManager } from "../../../Manager/DataManager";
import { NetworkManager } from "../../../Network/NetworkManager";
import { KeyframeAnimationManager } from "../AnimationLayer/KeyframeAnimation";

const { ccclass, property } = _decorator;

@ccclass("GameButtons")
export class GameButtons extends Component {
  @property(Node)
  logHistory: Node | null = null;

  private _isAutoPlay: boolean = false;

  onEnable() {
    const autoPlayButton = this.node.getChildByName("AutoPlay");
    const logButton = this.node.getChildByName("Log");
    const exitButton = this.node.getChildByName("Exit");

    logButton.on(Node.EventType.TOUCH_END, () => {
      this.logHistory.active = true;
    });

    exitButton.on(Node.EventType.TOUCH_END, () => {
      KeyframeAnimationManager.stopAll();
      find("Resident").getComponent(DataManager).clearData();
      director.loadScene("login", () => {
        find("Resident").getComponent(NetworkManager).reconnect();
      });
    });

    if (find("Resident").getComponent(DataManager).isRecord) {
      autoPlayButton.getComponentInChildren(Label).string = "暂停";
      autoPlayButton.on(Node.EventType.TOUCH_END, () => {
        if (this._isAutoPlay) {
          NetworkEventCenter.emit(NetworkEventToS.PAUSE_RECORD_TOS, { pause: false });
        } else {
          NetworkEventCenter.emit(NetworkEventToS.PAUSE_RECORD_TOS, { pause: true });
        }
      });
      ProcessEventCenter.on(ProcessEvent.RECORD_STATUS_CHANGE, (data) => {
        this._isAutoPlay = data.paused;
        if (data.paused) {
          autoPlayButton.getComponentInChildren(Label).string = "播放";
        } else {
          autoPlayButton.getComponentInChildren(Label).string = "暂停";
        }
      });
    } else {
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

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.RECORD_STATUS_CHANGE);
    ProcessEventCenter.off(ProcessEvent.GET_AUTO_PLAY_STATUS);
  }
}
