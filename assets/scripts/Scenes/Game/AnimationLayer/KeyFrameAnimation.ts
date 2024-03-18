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
    this.startTime = option.startTime || 0;
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
      for (let variation of variations) {
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
class KeyframeAnimationTrack<T extends Object> {
  private _object: T;
  private _animation: KeyframeAnimation;
  private _startTime: number;
  private initialValues: any[] = [];

  resolve: (value: any) => void;
  reject: (value: any) => void;

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._startTime + this._animation.duration;
  }

  constructor(object: T, animation: KeyframeAnimation) {
    this._object = object;
    this._animation = animation;
  }

  start() {
    for (let variation of this._animation.variations) {
      if (!variation.from) {
        this.initialValues.push(this.getAttribute(variation));
      } else {
        this.initialValues.push(null);
      }
    }
    this._startTime = new Date().getTime();
  }

  stop(skip: boolean = true) {
    this._startTime = 0;
    if (skip) {
      for (let variation of this._animation.variations) {
        this.setAttribute(variation, variation.to);
      }
    }
  }

  apf(time: number) {
    time -= this._startTime;
    if (time > this._animation.duration) return false;
    this._animation.variations.forEach((variation, i) => {
      const t = time - variation.startTime;
      const p = t / variation.duration;
      //当前属性在执行时间范围内
      if (p < 1) {
        let val;
        if (typeof variation.to === "number") {
          val = (1 - p) * (variation.from != null ? variation.from : this.initialValues[i]) + p * variation.to;
        } else {
          const from = (<Vec3>(variation.from != null ? variation.from : this.initialValues[i])).clone();
          const to = (<Vec3>variation.to).clone();
          val = from.multiplyScalar(1 - p).add(to.multiplyScalar(p));
        }
        this.setAttribute(variation, val);
      }
    });
    return true;
  }

  isBindingTo(object: T) {
    return object === this._object;
  }

  private getAttribute(variation: AttributeVariation) {
    const attrList = variation.attribute.split(".");
    if (attrList.length > 1) {
      let o = this._object;
      for (let i of attrList) {
        o = o[i];
      }
      return o;
    } else {
      return this._object[attrList[0]];
    }
  }

  private setAttribute(variation: AttributeVariation, val) {
    const attrList = variation.attribute.split(".");
    if (attrList.length > 1) {
      const l = attrList.length - 1;
      let o = this._object;
      for (let i = 0; i < l; i++) {
        o = o[attrList[i]];
      }
      o[attrList[l]] = val;
    } else {
      this._object[attrList[0]] = val;
    }
  }
}

//管理所有动画
export abstract class KeyframeAnimationManager {
  private static animations: { [index: string]: KeyframeAnimation } = {};
  private static activeAnimationList: KeyframeAnimationTrack<Object>[] = [];

  static createAnimation(
    name: string,
    variations: (AttributeNumberVariationOption | AttributeVertexVariationOption)[]
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

  static playAnimation(object: Object, animation: KeyframeAnimation): Promise<any>;
  static playAnimation(
    object: Object,
    animation: (AttributeNumberVariationOption | AttributeVertexVariationOption)[]
  ): Promise<any>;
  static playAnimation(object: Object, animation: string): Promise<any>;
  static playAnimation(
    object: Object,
    animation: KeyframeAnimation | string | (AttributeNumberVariationOption | AttributeVertexVariationOption)[]
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof animation === "string") {
        animation = this.getAnimation(animation);
        if (!animation) return;
      } else if (animation instanceof Array) {
        animation = new KeyframeAnimation(animation.map((option) => new AttributeVariation(option)));
      }
      const track = new KeyframeAnimationTrack<typeof object>(object, animation);
      this.activeAnimationList.push(track);
      track.resolve = resolve;
      track.reject = reject;
      track.start();
    });
  }

  static stopAnimation(object: Object, skip: boolean = true) {
    for (let i = 0; i < this.activeAnimationList.length; i++) {
      const track = this.activeAnimationList[i];
      if (track.isBindingTo(object)) {
        this.activeAnimationList.splice(i, 1);
        --i;
        track.stop(skip);
        track.reject(null);
      }
    }
  }

  static apf() {
    const time = new Date().getTime();
    for (let i = 0; i < this.activeAnimationList.length; i++) {
      const track = this.activeAnimationList[i];
      const isActive = track.apf(time);
      if (!isActive) {
        this.activeAnimationList.splice(i, 1);
        --i;
        track.resolve(null);
      }
    }
  }
}
