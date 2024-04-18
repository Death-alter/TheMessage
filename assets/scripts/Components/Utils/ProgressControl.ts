import { _decorator, Component, UITransform } from "cc";
import { UIEventCenter } from "../../Event/EventTarget";
import { UIEvent } from "../../Event/type";
import { KeyframeAnimationManager } from "../../Scenes/Game/AnimationLayer/KeyframeAnimation";
const { ccclass, property } = _decorator;

@ccclass("ProgressControl")
export class ProgressControl extends Component {
  private track: any = null;

  //倒计时
  startCountDown(seconds, callback?: () => void) {
    if (seconds <= 0) return;
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
    console.log(this.node.active, this.track);
    if (this.node.active && this.track) {
      this.node.active = false;
      KeyframeAnimationManager.stopAnimation(this.track);
      this.track = null;
    }
  }

  private playProgressAnimation(seconds) {
    return new Promise((resolve, reject) => {
      const barTransform = this.node.getChildByName("Bar").getComponent(UITransform);
      this.track = KeyframeAnimationManager.playAnimation(
        {
          target: barTransform,
          animation: [
            {
              attribute: "width",
              from: this.node.getComponent(UITransform).width,
              to: 0,
              duration: seconds,
            },
          ],
          callbacks: {
            complete: () => {
              resolve(true);
            },
            cancel: () => {
              resolve(false);
            },
          },
        },
        null,
        "clear",
      ).on(0, () => {
        this.node.active = true;
      });
    });
  }
}
