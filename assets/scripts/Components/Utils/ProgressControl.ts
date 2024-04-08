import { _decorator, Component, UITransform } from "cc";
import { ProcessEventCenter, UIEventCenter } from "../../Event/EventTarget";
import { ProcessEvent, UIEvent } from "../../Event/type";
import { KeyframeAnimationManager } from "../../Scenes/Game/AnimationLayer/KeyframeAnimation";
const { ccclass, property } = _decorator;

@ccclass("ProgressControl")
export class ProgressControl extends Component {
  private track: any = null;

  onEnable() {
    UIEventCenter.on(UIEvent.STOP_COUNT_DOWN, this.stopCountDown, this);
    ProcessEventCenter.on(ProcessEvent.RECORD_STATUS_CHANGE, this.onRecordStatusChange, this);
  }

  onDisable() {
    UIEventCenter.on(UIEvent.STOP_COUNT_DOWN, this.stopCountDown, this);
    ProcessEventCenter.off(ProcessEvent.RECORD_STATUS_CHANGE, this.onRecordStatusChange, this);
  }

  //倒计时
  startCountDown(seconds, callback?: () => void) {
    // this.stopCountDown();
    if (seconds < 0) return;
    this.node.active = true;
    this.playProgressAnimation(seconds).then((isComplete: boolean) => {
      if (callback) callback();
      if (isComplete) {
        UIEventCenter.emit(UIEvent.COUNT_DOWN_TIMEOUT, this);
      }
    });
  }

  pauseCountDown() {
    KeyframeAnimationManager.pauseAnimation(this.track);
  }

  resumeCountDown() {
    KeyframeAnimationManager.resumeAnimation(this.track);
  }

  stopCountDown() {
    if (this.track) {
      KeyframeAnimationManager.stopAnimation(this.track);
      this.track = null;
    }
  }

  private onRecordStatusChange(data) {
    if (data.paused) {
      this.pauseCountDown();
    } else {
      this.resumeCountDown();
    }
  }

  private playProgressAnimation(seconds) {
    return new Promise((resolve, reject) => {
      const bar = this.node.getChildByName("Bar");
      const barTransform = bar.getComponent(UITransform);
      barTransform.width = this.node.getComponent(UITransform).width;
      this.track = KeyframeAnimationManager.playAnimation({
        target: barTransform,
        animation: [
          {
            attribute: "width",
            to: 0,
            duration: seconds,
          },
        ],
        callbacks: {
          complete: () => {
            this.node.active = false;
            resolve(true);
          },
          cancel: () => {
            this.node.active = false;
            resolve(false);
          },
        },
      });
    });
  }
}
