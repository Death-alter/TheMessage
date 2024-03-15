export interface AttributeFrame {
  attribute: string;
  from?: number;
  to: number;
  startTime?: number;
  duration: number;
  easing?: (t: number) => number;
}

export class KeyframeAttribute {
  attribute: string;
  from: number;
  to: number;
  startTime: number;
  duration: number;
  easing?: (t: number) => number;

  constructor(option: AttributeFrame) {
    this.attribute = option.attribute;
    this.from = option.from || null;
    this.to = option.to;
    this.startTime = option.startTime || 0;
    this.duration = option.duration;
    this.easing = option.easing;
  }
}

//动画
export class KeyframeAnimation {
  private _keyframes: KeyframeAttribute[] = [];
  private _duration: number = 0;

  get keyframes() {
    return this._keyframes;
  }
  get duration() {
    return this.duration;
  }

  constructor(keyframes?: AttributeFrame[]) {
    if (keyframes) {
      for (let frame of keyframes) {
        this.addFrame(frame);
      }
    }
  }

  addFrame(frame: AttributeFrame) {
    const frameAttribute = new KeyframeAttribute(frame);
    const endTime = frameAttribute.startTime + frameAttribute.duration;
    if (this._duration < endTime) this._duration = endTime;
    this._keyframes.push(frameAttribute);
  }
}

//绑定节点和动画
export class KeyframeAnimationTrack<T> {
  private object: T;
  private animation: KeyframeAnimation;
  private _startTime: number;

  get startTime() {
    return this.startTime;
  }

  constructor(object: T, animation: KeyframeAnimation) {
    this.object = object;
    this.animation = animation;
  }

  start() {
    this._startTime = new Date().getTime();
  }

  apf(time) {
    time -= this._startTime;
    if (time > this._startTime + this.animation.duration) return false;
    for (let frame of this.animation.keyframes) {
      const t = time - frame.startTime;
      const p = 1 - t / (frame.duration * 1000);
      //当前属性在执行时间范围内
      if (p > 0) {
        const val = (1 - p) * frame.from + p * frame.to;
        eval(`this.object.${frame.attribute} = ${val}`);
      }
    }
    return true;
  }
}

//管理所有动画
export abstract class KeyframeAnimationManager {
  private static animations: { [index: string]: KeyframeAnimation };
  private static activeAnimationList: KeyframeAnimationTrack<any>[];

  static createAnimation(name: string, frames: AttributeFrame[]) {}

  static addAnimation(name: string, animation: KeyframeAnimation) {}

  static playAnimation(object: any, animation: KeyframeAnimation);
  static playAnimation(object: any, animation: string);
  static playAnimation(object: any, animation: KeyframeAnimation | string) {
    if (animation instanceof KeyframeAnimation) {
    }
  }

  static apf() {
    for (let animation of this.activeAnimationList) {
    }
  }
}
