import { _decorator, Component, UITransform } from "cc";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { KeyframeAnimationManager } from "../../Scenes/Game/AnimationLayer/KeyframeAnimation";
const { ccclass, property } = _decorator;

@ccclass("ProgressControl")
export class ProgressControl extends Component {
  private track: any = null;

  onEnable() {
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.stopCountDown, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.stopCountDown, this);
  }

  //倒计时
  startCountDown(seconds, callback?: () => void) {
    // this.stopCountDown();
    if (seconds < 0) return;
    this.node.active = true;
    this.playProgressAnimation(seconds).then((isComplete: boolean) => {
      if (callback) callback();
      if (isComplete) {
        ProcessEventCenter.emit(ProcessEvent.COUNT_DOWN_TIMEOUT, this);
      }
    });
  }

  stopCountDown() {
    if (this.track) {
      KeyframeAnimationManager.stopAnimation(this.track);
      this.track = null;
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
        onComplete: () => {
          this.node.active = false;
          resolve(true);
        },
        onCancel: () => {
          this.node.active = false;
          resolve(false);
        },
      });
    });
  }
}
