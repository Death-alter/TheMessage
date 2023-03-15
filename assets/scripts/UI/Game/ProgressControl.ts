import { _decorator, Component, tween, Tween, UITransform } from "cc";
import EventTarget from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("ProgressControl")
export class ProgressControl extends Component {
  private _progressAnimation: Tween<UITransform> | null = null;
  private onStopCountDown: () => void;

  onEnable() {
    this.onStopCountDown = () => {
      this.stopCountDown();
    };
    EventTarget.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown);
  }

  onDisable() {
    EventTarget.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown);
  }

  //倒计时
  startCoundDown(seconds, callback?: Function) {
    this.stopCountDown();
    this.node.active = true;
    this.playProgressAnimation(seconds).then(() => {
      if (callback) callback();
    });
  }

  stopCountDown() {
    if (this._progressAnimation) {
      this._progressAnimation.stop();
      this._progressAnimation = null;
      this.node.active = false;
    }
  }

  private playProgressAnimation(seconds) {
    return new Promise((reslove, reject) => {
      try {
        const bar = this.node.getChildByName("Bar");
        const barTransform = bar.getComponent(UITransform);
        barTransform.width = this.node.getComponent(UITransform).width;
        this._progressAnimation = tween(barTransform)
          .to(
            seconds,
            { width: 0 },
            {
              onComplete: () => {
                this.node.active = false;
                reslove(null);
              },
            }
          )
          .start();
      } catch (e) {
        reject(e);
      }
    });
  }
}
