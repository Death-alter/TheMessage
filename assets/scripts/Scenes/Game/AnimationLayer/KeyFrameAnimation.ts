import { Vec2, Vec3, Vec4 } from "cc";

interface AttributeVariationOption {
  attribute: string;
  startTime?: number;
  duration: number; //持续时间，单位秒
  easing?: (t: number) => number;
}

export interface AttributeNumberVariationOption extends AttributeVariationOption {
  from?: number;
  to: number;
}

export interface AttributeVertexVariationOption extends AttributeVariationOption {
  from?: Vec2 | Vec3 | Vec4;
  to: Vec2 | Vec3 | Vec4;
}

type AnimationAction = "default" | "mix" | "replace" | "clear";
type AnimationTrackEvent = "complete" | "cancel";

//属性
export class AttributeVariation {
  attribute: string;
  from: number | Vec2 | Vec3 | Vec4;
  to: number | Vec2 | Vec3 | Vec4;
  startTime: number;
  duration: number; //持续时间，单位毫秒
  easing?: (t: number) => number;

  constructor(option: AttributeNumberVariationOption | AttributeVertexVariationOption) {
    this.attribute = option.attribute;
    this.from = option.from || null;
    this.to = option.to;
    this.startTime = option.startTime * 1000 || 0;
    this.duration = option.duration * 1000;
    this.easing = option.easing;
  }
}

//动画
export class KeyframeAnimation {
  private _variations: AttributeVariation[] = [];
  private _duration: number = 0;

  get variations() {
    return this._variations;
  }
  get duration() {
    return this._duration;
  }

  constructor(variations?: AttributeVariation[]) {
    if (variations) {
      for (const variation of variations) {
        this.addVariation(variation);
      }
    }
  }

  addVariation(variation: AttributeVariation) {
    const endTime = variation.startTime + variation.duration;
    if (this._duration < endTime) this._duration = endTime;
    this._variations.push(variation);
  }
}

//绑定节点和动画
class KeyframeAnimationTrack<T extends object> {
  private _target: T;
  private _animation: KeyframeAnimation;
  private _duration: number;
  private _startTime: number;
  private initialValues: any[] = [];
  private timeLine: { time: number; events: (() => void)[] }[] = [];
  private timeLineIndex: number = -1;
  private events: { [key in AnimationTrackEvent]?: (() => void)[] } = {};

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._startTime + this._duration;
  }

  get target() {
    return this._target;
  }

  constructor(target: T, animation: KeyframeAnimation, onComplete?: () => void, onCancel?: () => void) {
    this._target = target;
    this._animation = animation;
    this._duration = this._animation.duration;
    this.events.complete = [];
    if (typeof onComplete === "function") this.events.complete.push(onComplete);
    this.events.cancel = [];
    if (typeof onCancel === "function") this.events.cancel.push(onCancel);
  }

  start() {
    this._startTime = new Date().getTime();
    this.timeLineIndex = 0;
  }

  stop(skip: boolean = true) {
    if (this.timeLineIndex < 0) return;
    if (skip) {
      for (let i = this.timeLineIndex; i < this.timeLine.length; i++) {
        for (const func of this.timeLine[i].events) {
          func();
        }
      }
      for (const variation of this._animation.variations) {
        this.setAttribute(variation, variation.to);
      }
    }
    this._startTime = 0;
    this.timeLineIndex = -1;
  }

  on(time: number, callback: () => void); //单位s
  on(eventName: AnimationTrackEvent, callback: () => void);
  on(event: number | AnimationTrackEvent, callback: () => void) {
    if (typeof event === "string") {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(callback);
    } else {
      const time = event * 1000;
      if (this._duration < time) this._duration = time;
      if (this.timeLine.length === 0) {
        this.timeLine.push({ time, events: [callback] });
      } else {
        for (let i = this.timeLine.length - 1; i >= 0; i--) {
          const item = this.timeLine[i];
          if (time === item.time) {
            item.events.push(callback);
            break;
          } else if (time > item.time) {
            this.timeLine.splice(i + 1, 0, { time, events: [callback] });
            break;
          }
        }
      }
    }

    return this;
  }

  trigger(eventName: AnimationTrackEvent) {
    if (this.events[eventName] && this.events[eventName].length > 0) {
      for (const func of this.events[eventName]) {
        func();
      }
    }
  }

  apf(time: number) {
    if (!this._target) return false;
    time -= this._startTime;
    if (this.timeLineIndex < this.timeLine.length) {
      while (this.timeLine[this.timeLineIndex] && time >= this.timeLine[this.timeLineIndex].time) {
        for (const func of this.timeLine[this.timeLineIndex].events) {
          func();
        }
        ++this.timeLineIndex;
      }
    }
    if (time > this._duration) {
      this._animation.variations.forEach((variation) => {
        this.setAttribute(variation, variation.to);
      });
      return false;
    }
    this._animation.variations.forEach((variation, i) => {
      const t = time - variation.startTime;
      if (t < 0) return;
      if (this.initialValues[i] === undefined) {
        if (variation.from) {
          this.initialValues[i] = variation.from;
        } else {
          this.initialValues[i] = this.getAttribute(variation);
        }
      }
      const p = t / variation.duration;
      //当前属性在执行时间范围内
      if (p < 1) {
        let val;
        if (typeof variation.to === "number") {
          val = (1 - p) * this.initialValues[i] + p * variation.to;
        } else {
          const from = (<Vec3>this.initialValues[i]).clone();
          const to = (<Vec3>variation.to).clone();
          val = from.multiplyScalar(1 - p).add(to.multiplyScalar(p));
        }
        this.setAttribute(variation, val);
      }
    });
    return true;
  }

  private getAttribute(variation: AttributeVariation) {
    if (!this._target) return null;
    if (this._target[variation.attribute] !== undefined) {
      if (typeof this._target[variation.attribute] === "number") {
        return this._target[variation.attribute];
      } else {
        return this._target[variation.attribute].clone();
      }
    } else {
      const attrList = variation.attribute.split(".");
      if (attrList.length > 1) {
        const l = attrList.length - 1;
        let o = this._target;
        for (let i = 0; i < l; i++) {
          o = o[attrList[i]];
        }
        if (typeof o[attrList[l]] === "number") {
          return o[attrList[l]];
        } else {
          return o[attrList[l]].clone();
        }
      } else {
        return null;
      }
    }
  }

  private setAttribute(variation: AttributeVariation, val) {
    if (!this._target) throw new Error("对象不存在");
    if (this._target[variation.attribute] !== undefined) {
      this._target[variation.attribute] = val;
    } else {
      const attrList = variation.attribute.split(".");
      if (attrList.length > 1) {
        const l = attrList.length - 1;
        let o = this._target;
        for (let i = 0; i < l; i++) {
          o = o[attrList[i]];
        }
        o[attrList[l]] = val;
      } else {
        throw new Error("对象没有该属性");
      }
    }
  }
}

//管理所有动画
export abstract class KeyframeAnimationManager {
  private static animations: { [index: string]: KeyframeAnimation } = {};
  private static animationQueue = new Map<object, KeyframeAnimationTrack<object>[]>();
  private static activeAnimationMap = new Map<object, KeyframeAnimationTrack<object>[]>();

  private static enQueue(target: object, track: KeyframeAnimationTrack<object>) {
    if (!this.animationQueue.has(target)) {
      this.animationQueue.set(target, []);
    }
    const queue = this.animationQueue.get(target);
    queue.push(track);
  }

  private static deQueue(target: object) {
    if (!this.animationQueue.has(target)) {
      return null;
    }
    const queue = this.animationQueue.get(target);
    const track = queue.shift();
    if (queue.length === 0) {
      this.animationQueue.delete(target);
    }
    return track;
  }

  static createAnimation(
    name: string,
    variations: (AttributeNumberVariationOption | AttributeVertexVariationOption)[],
  ) {
    this.animations[name] = new KeyframeAnimation(variations.map((option) => new AttributeVariation(option)));
  }

  static addAnimation(name: string, animation: KeyframeAnimation) {
    this.animations[name] = animation;
  }

  static removeAnimation(name: string) {
    delete this.animations[name];
  }

  static getAnimation(name: string) {
    return this.animations[name];
  }

  static playAnimation(
    option: {
      target: object;
      animation: KeyframeAnimation;
      onComplete?: () => void;
      onCancel?: () => void;
    },
    action?: AnimationAction,
  ): KeyframeAnimationTrack<typeof option.target>;
  static playAnimation(
    option: {
      target: object;
      animation: (AttributeNumberVariationOption | AttributeVertexVariationOption)[];
      onComplete?: () => void;
      onCancel?: () => void;
    },
    action?: AnimationAction,
  ): KeyframeAnimationTrack<typeof option.target>;
  static playAnimation(
    option: {
      target: object;
      animation: string;
      onComplete?: () => void;
      onCancel?: () => void;
    },
    action?: AnimationAction,
  ): KeyframeAnimationTrack<typeof option.target>;
  static playAnimation(
    option: {
      target: object;
      animation: KeyframeAnimation | string | (AttributeNumberVariationOption | AttributeVertexVariationOption)[];
      onComplete?: () => void;
      onCancel?: () => void;
    },
    action: AnimationAction = "default",
  ): KeyframeAnimationTrack<typeof option.target> {
    const { target, onComplete, onCancel } = option;
    let { animation } = option;
    if (!(typeof target === "object")) return null;
    if (typeof animation === "string") {
      animation = this.getAnimation(animation);
      if (!animation) return;
    } else if (animation instanceof Array) {
      animation = new KeyframeAnimation(animation.map((option) => new AttributeVariation(option)));
    }
    let track;
    switch (action) {
      case "replace":
        track = new KeyframeAnimationTrack<typeof target>(target, animation, onComplete, onCancel);
        this.activeAnimationMap.set(target, [track]);
        track.start();
        break;
      case "mix":
        track = new KeyframeAnimationTrack<typeof target>(target, animation, onComplete, onCancel);
        if (this.activeAnimationMap.has(target)) {
          const tracks = this.activeAnimationMap.get(target);
          tracks.push(track);
        } else {
          this.activeAnimationMap.set(target, [track]);
        }
        track.start();
        break;
      case "clear":
        this.animationQueue.delete(track);
        track = new KeyframeAnimationTrack<typeof target>(target, animation, onComplete, onCancel);
        this.activeAnimationMap.set(target, [track]);
        track.start();
        break;
      case "default":
      default:
        track = new KeyframeAnimationTrack<typeof target>(target, animation, onComplete, onCancel);
        if (this.animationQueue.has(target) || this.activeAnimationMap.has(target)) {
          this.enQueue(target, track);
        } else {
          this.activeAnimationMap.set(target, [track]);
          track.start();
        }
    }

    return track;
  }

  static stopAnimation(track: KeyframeAnimationTrack<object>, skip?: boolean);
  static stopAnimation(target: object, skip?: boolean);
  static stopAnimation(object: object | KeyframeAnimationTrack<object>, skip: boolean = true) {
    if (object instanceof KeyframeAnimationTrack) {
      //删除一个track
      object.trigger("cancel");
      const target = object.target;
      object.stop(skip);
      const tracks = this.activeAnimationMap.get(target);
      if (!tracks) return;
      if (tracks.length > 1) {
        tracks.splice(tracks.indexOf(object), 1);
      } else {
        if (this.animationQueue.has(target)) {
          this.activeAnimationMap.set(target, [this.deQueue(target)]);
        } else {
          this.activeAnimationMap.delete(target);
        }
      }
    } else {
      //删除一个target对应的所有track
      if (this.animationQueue.has(object)) {
        this.activeAnimationMap.set(object, [this.deQueue(object)]);
      } else {
        this.activeAnimationMap.delete(object);
      }
    }
  }

  static apf() {
    const time = new Date().getTime();
    this.activeAnimationMap.forEach((tracks, target) => {
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const isActive = track.apf(time);
        if (!isActive) {
          track.trigger("complete");
          tracks.splice(i, 1);
          --i;
        }
      }
    });
    this.activeAnimationMap.forEach((tracks, target) => {
      if (tracks.length === 0) {
        if (this.animationQueue.has(target)) {
          const track = this.deQueue(target);
          this.activeAnimationMap.set(target, [track]);
          track.start();
        } else {
          this.activeAnimationMap.delete(target);
        }
      }
    });
  }

  static reset() {
    this.animations = {};
    this.animationQueue = new Map<object, KeyframeAnimationTrack<object>[]>();
    this.activeAnimationMap = new Map<object, KeyframeAnimationTrack<object>[]>();
  }
}
