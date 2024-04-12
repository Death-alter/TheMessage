import { TweenEasing, Vec2, Vec3, Vec4, easing } from "cc";

interface AttributeVariationOption {
  /**
   * 需要修改的属性名称
   */
  attribute: string;
  /**
   * 开始时间，单位秒
   */
  startTime?: number;
  /**
   * 持续时间，单位秒
   */
  duration: number;
  /**
   * 缓动函数，可以使用内置缓动函数名称或自定义一个函数
   */
  easing?: TweenEasing | ((t: number) => number);
}

interface TrackGroupOption {
  track: KeyframeAnimationTrack<any>;
  startTime: number;
}

interface PlayAnimationOpiton {
  target: object;
  targetModify?: (target: object) => object;
  animation: KeyframeAnimation | string | (AttributeNumberVariationOption | AttributeVertexVariationOption)[];
  callbacks?: { [key in AnimationTrackEvent]?: () => void };
  startTime?: number;
}

/**
 * 值为数字的动画选项
 */
export interface AttributeNumberVariationOption extends AttributeVariationOption {
  /**
   * 初始值，默认为当前值
   */
  from?: number;
  /**
   * 结束值
   */
  to: number;
}

/**
 * 值为向量的动画选项
 */
export interface AttributeVertexVariationOption extends AttributeVariationOption {
  /**
   * 初始值，默认为当前值
   */
  from?: Vec2 | Vec3 | Vec4;
  /**
   * 结束值
   */
  to: Vec2 | Vec3 | Vec4;
}

/**
 * 动画的添加方式
 */
export type AnimationAction = "default" | "mix" | "replace" | "clear";
/**
 * 可以使用的动画事件
 */
export type AnimationTrackEvent = "complete" | "cancel" | "pause" | "resume";

/**
 * 关键帧动画属性
 */
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
    if (typeof option.easing === "function") {
      this.easing = option.easing;
    } else {
      this.easing = easing[option.easing];
    }
  }
}

/**
 * 关键帧动画类
 */
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

  /**
   * 向动画中添加一个属性AttributeVariation
   * @param variation AttributeVariation类
   */
  addVariation(variation: AttributeVariation) {
    const endTime = variation.startTime + variation.duration;
    if (this._duration < endTime) this._duration = endTime;
    this._variations.push(variation);
  }
}

abstract class AnimationTrack {
  protected _startTime: number = 0;
  protected _pauseStartTime: number = 0;
  protected _totalPausedTime: number = 0;
  protected _duration: number = 0;
  protected timeLine: { time: number; events: (() => void)[] }[] = [];
  protected timeLineIndex: number = -1;
  protected events: { [key in AnimationTrackEvent]?: (() => void)[] } = {};

  /**
   * 动画是否暂停
   */
  get paused() {
    return this._pauseStartTime !== 0;
  }

  /**
   * 注册一个动画事件
   * @param {number} time 触发事件的时间，从动画播放开始计算（单位：秒）
   * @param {Function} callback 回调函数
   * @returns 当前KeyframeAnimationTrack对象自身
   */
  on(time: number, callback: () => void): AnimationTrack;

  /**
   * 注册一个动画事件
   * @param {AnimationTrackEvent} eventName 事件名称
   * @param {Function} callback 回调函数
   * @returns 当前KeyframeAnimationTrack对象自身
   */
  on(eventName: AnimationTrackEvent, callback: () => void): AnimationTrack;
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

  /**
   * 手动触发一个动画事件
   * @param eventName 要触发的事件名
   */
  trigger(eventName: AnimationTrackEvent) {
    if (this.events[eventName] && this.events[eventName].length > 0) {
      for (const func of this.events[eventName]) {
        func();
      }
    }
  }

  abstract start();
  abstract stop(skip?: boolean);
  abstract pause();
  abstract resume();
  abstract apf(time: number);
}

class KeyframeAnimationTrackGroup extends AnimationTrack {
  private _tracks: KeyframeAnimationTrack<any>[] = [];
  private _trackStartTime: number[] = [];
  private _isComplete: boolean[] = [];

  /**
   * 动画开始时间
   */
  get startTime() {
    return this._startTime;
  }

  /**
   * 动画持续时间
   */
  get duration() {
    return this._duration;
  }

  /**
   * 动画结束时间
   */
  get endTime() {
    return this._startTime + this._duration;
  }

  constructor(options?: TrackGroupOption[]) {
    super();
    options &&
      options.forEach((item) => {
        this.addTrack(item.track, item.startTime);
      });
  }

  addTrack(track: KeyframeAnimationTrack<any>, startTime?: number) {
    if (startTime == null) {
      startTime = this._startTime > 0 ? new Date().getTime() - this._startTime : 0;
    } else {
      startTime *= 1000;
    }
    this._tracks.push(track);
    this._trackStartTime.push(startTime);
    this._isComplete.push(false);
    const endTime = track.duration + startTime;
    if (endTime > this._duration) this._duration = endTime;
    if (this._startTime === 0 && track.startTime) this._startTime = track.startTime;
  }

  mix(trackGroup: KeyframeAnimationTrackGroup) {
    trackGroup._tracks.forEach((track, index) => {
      this.addTrack(track, trackGroup._trackStartTime[index]);
    });
    if (this._startTime === 0 && trackGroup.startTime) this._startTime = trackGroup.startTime;
  }

  start() {
    this._startTime = new Date().getTime();
    this._isComplete.fill(false);
  }

  stop(skip: boolean = true) {
    this._tracks.forEach((track) => {
      track.trigger("cancel");
      track.stop(skip);
    });
  }

  /**
   * 暂停当前group，如果group处于暂停状态，不进行任何操作。该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。要暂停该group请使用KeyframeAnimationManager.pauseAnimation()
   */
  pause() {
    if (this._pauseStartTime === 0) {
      this._pauseStartTime = new Date().getTime();
      this._tracks.forEach((track) => {
        track.trigger("pause");
      });
    }
  }

  /**
   * 继续播放当前group，如果group未处于暂停状态，不进行任何操作。该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。要暂停该group请使用KeyframeAnimationManager.resumeAnimation()
   */
  resume() {
    if (this._pauseStartTime !== 0) {
      this._totalPausedTime += new Date().getTime() - this._pauseStartTime;
      this._pauseStartTime = 0;
      this._tracks.forEach((track) => {
        track.trigger("resume");
      });
    }
  }

  apf(time: number) {
    if (this._tracks.length === 0) return false;
    time -= this._startTime + this._totalPausedTime;
    for (let i = 0; i < this._tracks.length; i++) {
      const track = this._tracks[i];
      const t = time - this._trackStartTime[i];
      if (t > 0 && !this._isComplete[i]) {
        const isActive = track.apf(t);
        if (!isActive) {
          track.trigger("complete");
          this._isComplete[i] = true;
        }
      }
    }
    if (this._isComplete.every((flag) => flag)) return false;
    return true;
  }
}

/**
 * 绑定节点和动画
 */
class KeyframeAnimationTrack<T extends object> extends AnimationTrack {
  private _target: T;
  private _animation: KeyframeAnimation;
  private initialValues: any[] = [];

  /**
   * 动画开始时间
   */
  get startTime() {
    return this._startTime;
  }

  /**
   * 动画持续时间
   */
  get duration() {
    return this._duration;
  }

  /**
   * 动画结束时间
   */
  get endTime() {
    return this._startTime + this._duration;
  }

  /**
   * 动画绑定的对象
   */
  get target() {
    return this._target;
  }

  constructor(target: T, animation: KeyframeAnimation, callbacks?: { [key in AnimationTrackEvent]?: () => void }) {
    super();
    this._target = target;
    this._animation = animation;
    this._duration = this._animation.duration;
    if (callbacks) {
      for (const eventName in callbacks) {
        this.on(<AnimationTrackEvent>eventName, callbacks[eventName]);
      }
    }
  }

  /**
   * 开始当前track，该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。
   */
  start() {
    this._startTime = new Date().getTime();
    this.timeLineIndex = 0;
  }

  /**
   * 停止当前track，该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。要停止该track请使用KeyframeAnimationManager.stopAnimation()
   * @param {boolean} [skip=true] 是否跳当前动画的剩余部分，直接跳到结束位置
   */
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

  /**
   * 暂停当前track，如果track处于暂停状态，不进行任何操作。该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。要暂停该track请使用KeyframeAnimationManager.pauseAnimation()
   */
  pause() {
    if (this._pauseStartTime === 0) {
      this._pauseStartTime = new Date().getTime();
    }
  }

  /**
   * 继续播放当前track，如果track未处于暂停状态，不进行任何操作。该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。要暂停该track请使用KeyframeAnimationManager.resumeAnimation()
   */
  resume() {
    if (this._pauseStartTime !== 0) {
      this._totalPausedTime += new Date().getTime() - this._pauseStartTime;
      this._pauseStartTime = 0;
    }
  }

  /**
   * 计算一帧的动画，该方法由KeyframeAnimationManager类自动调用，请勿手动调用该方法。
   * @param time 本帧的时间戳
   */
  apf(time: number) {
    if (!this._target) return false;
    if (time > this._startTime) {
      time -= this._startTime + this._totalPausedTime;
    }
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
      const p =
        typeof variation.easing === "function" ? variation.easing(t / variation.duration) : t / variation.duration;
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

  /**
   * 获取当前track的target对应属性的值
   * @param variation AttributeVariation对象
   * @returns 获取的值
   */
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

  /**
   * 设置当前track的target对应属性的值
   * @param variation AttributeVariation对象
   * @param val 值
   */
  private setAttribute(variation: AttributeVariation, val: number | Vec2 | Vec3 | Vec4) {
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

/**
 * 管理所有KeyframeAnimation动画
 * @static
 */
export abstract class KeyframeAnimationManager {
  /**
   * 已经注册的动画
   */
  private static animations: { [index: string]: KeyframeAnimation } = {};
  /**
   * 未播放的动画队列
   */
  private static animationQueue = new Map<object | string, AnimationTrack[]>();
  /**
   * 正在播放的动画
   */
  private static activeAnimationMap = new Map<object | string, AnimationTrack>();

  /**
   * 把一个动画加入动画队列
   * @param track KeyframeAnimationTrack对象
   * @param queueName 要加入的队列名称
   */
  private static enQueue(track: KeyframeAnimationTrack<any>, queueName?: string);
  /**
   * 把一个动画组加入动画队列
   * @param trackGroup KeyframeAnimationTrackGroup对象
   * @param queueName 要加入的队列名称
   */
  private static enQueue(track: KeyframeAnimationTrackGroup, queueName: string);
  private static enQueue(track: AnimationTrack, queueName?: string) {
    if (queueName) {
      if (!this.animationQueue.has(queueName)) {
        this.animationQueue.set(queueName, []);
      }
      this.animationQueue.get(queueName).push(track);
    } else {
      if (!this.animationQueue.has((<KeyframeAnimationTrack<any>>track).target)) {
        this.animationQueue.set((<KeyframeAnimationTrack<any>>track).target, []);
      }
      this.animationQueue.get((<KeyframeAnimationTrack<any>>track).target).push(track);
    }
  }

  /**
   * 取出一个具名动画队列中的第一个动画
   * @param queueName 队列名称
   * @returns 取出的KeyframeAnimationTrack类
   */
  private static deQueue(queueName: string);
  /**
   * 取出一个target的动画队列中的第一个动画
   * @param target 绑定了动画的对象
   * @returns 取出的KeyframeAnimationTrack类
   */
  private static deQueue(target: object);
  private static deQueue(target: object | string): AnimationTrack {
    if (!this.animationQueue.has(target)) {
      return null;
    }
    const queue = this.animationQueue.get(target);
    const track = queue.shift();
    if (typeof target !== "string" && queue.length === 0) {
      this.animationQueue.delete(target);
    }
    return track;
  }

  /**
   * 使用属性选项生成一个KeyframeAnimation动画
   * @param variations 属性选项
   * @returns 生成的KeyframeAnimation对象
   */
  static createAnimation(variations: (AttributeNumberVariationOption | AttributeVertexVariationOption)[]);
  /**
   * 使用属性选项生成一个KeyframeAnimation动画并注册，如果名称已存在则会覆盖之前的动画
   * @param variations 属性选项
   * @param name 动画名称
   * @returns 生成的KeyframeAnimation对象
   */
  static createAnimation(variations: (AttributeNumberVariationOption | AttributeVertexVariationOption)[], name: string);
  static createAnimation(
    variations: (AttributeNumberVariationOption | AttributeVertexVariationOption)[],
    name?: string,
  ): KeyframeAnimation {
    const track = new KeyframeAnimation(variations.map((option) => new AttributeVariation(option)));
    if (name) this.animations[name] = track;
    return track;
  }

  /**
   * 注册一个KeyframeAnimation动画，如果名称已存在则会覆盖之前的动画
   * @param name 动画名称
   * @param animation 一个KeyframeAnimation对象
   */
  static addAnimation(name: string, animation: KeyframeAnimation) {
    this.animations[name] = animation;
  }

  /**
   * 移除一个已注册的KeyframeAnimation动画
   * @param name 动画名称
   */
  static removeAnimation(name: string) {
    delete this.animations[name];
  }

  /**
   * 获取一个已注册的KeyframeAnimation动画
   * @param name 动画名称
   * @returns 获取的KeyframeAnimation动画
   */
  static getAnimation(name: string) {
    return this.animations[name];
  }

  /**
   * 播放一个KeyframeAnimation动画
   * @param {Object} option 动画选项
   * @param {object} option.target 执行动画的对象，必须是js的object类型
   * @param {Function} [option.targetModify] 对动画对象进行修改
   * @param {KeyframeAnimation} option.animation KeyframeAnimation动画对象
   * @param {Function} [option.callbacks] 事件回调
   * @param queueName 动画队列
   * @param {string} action 动画添加方式
   * @returns {KeyframeAnimationTrack} 返回根据传入参数生成的KeyframeAnimationTrack
   */
  static playAnimation(
    option: {
      target: object;
      targetModify?: (target: object) => object;
      animation: KeyframeAnimation;
      callbacks?: { [key in AnimationTrackEvent]?: () => void };
    },
    queueName?: string,
    action?: AnimationAction,
  ): KeyframeAnimationTrack<typeof option.target>;

  /**
   * 播放一个KeyframeAnimation动画
   * @param option 动画选项
   * @param option.target 执行动画的对象，必须是js的object类型
   * @param option.targetModify 对动画对象进行修改
   * @param option.animation KeyframeAnimation动画对象
   * @param option.callbacks 事件回调
   * @param queueName 动画队列
   * @param action 动画添加方式
   * @returns 返回根据传入参数生成的KeyframeAnimationTrack
   */
  static playAnimation(
    option: PlayAnimationOpiton[],
    queueName?: string,
    action?: AnimationAction,
  ): KeyframeAnimationTrackGroup;

  /**
   * 创建并播放一个KeyframeAnimation动画
   * @param option 动画选项
   * @param option.target 执行动画的对象，必须是js的object类型
   * @param option.targetModify 对动画对象进行修改
   * @param option.animation 动画关键帧数组
   * @param option.callbacks 事件回调
   * @param queueName 动画队列
   * @param action 动画添加方式
   * @returns 返回根据传入参数生成的KeyframeAnimationTrack
   */
  static playAnimation(
    option: PlayAnimationOpiton,
    queueName?: string,
    action?: AnimationAction,
  ): KeyframeAnimationTrack<object> | KeyframeAnimationTrackGroup;

  /**
   * 播放一个已经注册过的动画
   * @param option 动画选项
   * @param option.target 执行动画的对象，必须是js的object类型
   * @param option.targetModify 对动画对象进行修改
   * @param option.animation 已经注册过的动画名称
   * @param queueName 动画队列
   * @param action 动画添加方式
   * @returns 返回根据传入参数生成的KeyframeAnimationTrack
   */
  static playAnimation(
    option: PlayAnimationOpiton,
    queueName?: string,
    action?: AnimationAction,
  ): KeyframeAnimationTrack<object> | KeyframeAnimationTrackGroup;
  static playAnimation(
    option: PlayAnimationOpiton | PlayAnimationOpiton[],
    queueName?: string,
    action: AnimationAction = "default",
  ): KeyframeAnimationTrack<object> | KeyframeAnimationTrackGroup {
    if (option instanceof Array) {
      if (!queueName) {
        throw new Error("动画组必须在一个具名队列中播放");
      }
      const trackArr = [];
      for (const item of option) {
        const { target, callbacks, targetModify } = item;
        let { animation } = item;
        if (typeof animation === "string") {
          animation = this.getAnimation(animation);
          if (!animation) return;
        } else if (animation instanceof Array) {
          animation = new KeyframeAnimation(animation.map((option) => new AttributeVariation(option)));
        }
        const t = targetModify ? targetModify(target) : target;
        const track = new KeyframeAnimationTrack<typeof t>(t, animation, callbacks);
        trackArr.push(track);
      }
      const trackGroup = new KeyframeAnimationTrackGroup(
        trackArr.map((track, i) => ({ track, startTime: option[i].startTime })),
      );
      switch (action) {
        case "replace":
          this.activeAnimationMap.set(queueName, trackGroup);
          trackGroup.start();
          return trackGroup;
        case "mix":
          const currentTrack = this.activeAnimationMap.get(queueName);
          if (!currentTrack) {
            trackGroup.start();
            this.activeAnimationMap.set(queueName, trackGroup);
            return;
          }
          if (currentTrack instanceof KeyframeAnimationTrackGroup) {
            currentTrack.mix(trackGroup);
            return currentTrack;
          } else {
            const trackGroup = new KeyframeAnimationTrackGroup();
            trackGroup.addTrack(<KeyframeAnimationTrack<object>>currentTrack);
            trackGroup.mix(trackGroup);
            this.activeAnimationMap.set(queueName, trackGroup);
            trackGroup.start();
            return trackGroup;
          }
        case "clear":
          this.animationQueue.set(queueName, []);
          this.activeAnimationMap.set(queueName, trackGroup);
          trackGroup.start();
          return trackGroup;
        case "default":
        default:
          if (this.activeAnimationMap.has(queueName)) {
            this.enQueue(trackGroup, queueName);
          } else {
            this.activeAnimationMap.set(queueName, trackGroup);
            trackGroup.start();
          }
          return trackGroup;
      }
    } else {
      const { target, callbacks, targetModify } = option;
      let { animation } = option;
      if (typeof animation === "string") {
        animation = this.getAnimation(animation);
        if (!animation) return;
      } else if (animation instanceof Array) {
        animation = new KeyframeAnimation(animation.map((option) => new AttributeVariation(option)));
      }
      const t = targetModify ? targetModify(target) : target;
      const track = new KeyframeAnimationTrack<typeof t>(t, animation, callbacks);
      switch (action) {
        case "replace":
          this.activeAnimationMap.set(queueName || target, track);
          track.start();
          return track;
        case "mix":
          const currentTrack = this.activeAnimationMap.get(queueName || target);
          if (currentTrack instanceof KeyframeAnimationTrackGroup) {
            currentTrack.addTrack(track);
            return currentTrack;
          } else {
            const trackGroup = new KeyframeAnimationTrackGroup();
            trackGroup.addTrack(<KeyframeAnimationTrack<object>>currentTrack);
            trackGroup.addTrack(track);
            this.activeAnimationMap.set(queueName || target, trackGroup);
            trackGroup.start();
            return trackGroup;
          }
        case "clear":
          this.animationQueue.delete(track);
          this.activeAnimationMap.set(queueName || target, track);
          track.start();
          return track;
        case "default":
        default:
          if (this.activeAnimationMap.has(queueName || target)) {
            this.enQueue(track, queueName);
          } else {
            this.activeAnimationMap.set(queueName || target, track);
            track.start();
          }
          return track;
      }
    }
  }

  /**
   * 结束一个KeyframeAnimation动画
   * @param {KeyframeAnimationTrack} track KeyframeAnimationTrack对象
   * @param {boolean} [skip=true] 是否跳当前动画的剩余部分，直接跳到结束位置
   */
  static stopAnimation(track: KeyframeAnimationTrack<object>, skip?: boolean): void;
  /**
   * 结束一个target正在播放的动画，继续播放队列中其他的动画
   * @param {Object} target 正在执行动画的target
   * @param {boolean} [skip=true] 是否跳当前动画的剩余部分，直接跳到结束位置
   */
  static stopAnimation(queueName: string, skip?: boolean): void;
  /**
   * 结束一个具名队列正在播放的动画，继续播放队列中其他的动画
   * @param {string} queueName 队列名称
   * @param {boolean} [skip=true] 是否跳当前动画的剩余部分，直接跳到结束位置
   */
  static stopAnimation(target: object, skip?: boolean): void;
  static stopAnimation(object: object | KeyframeAnimationTrack<object> | string, skip: boolean = true): void {
    let track;
    if (object instanceof KeyframeAnimationTrack) {
      track = this.activeAnimationMap.get(object.target);
    } else {
      //删除一个target对应的所有track
      track = this.activeAnimationMap.get(object);
    }
    if (track) {
      track.trigger("cancel");
      track.stop(skip);
    }
    if (this.animationQueue.has(object)) {
      this.activeAnimationMap.set(object, this.deQueue(<object>object));
    } else {
      this.activeAnimationMap.delete(object);
    }
  }

  /**
   * 停止所有动画
   * @param {boolean} [skip=true] 是否跳当前动画的剩余部分，直接跳到结束位置
   */
  static stopAll(skip: boolean = true) {
    for (const key of this.activeAnimationMap.keys()) {
      this.stopAnimation(<object>key, skip);
    }
  }

  /**
   * 暂停一个KeyframeAnimation动画
   * @param {KeyframeAnimationTrack} track KeyframeAnimationTrack对象
   */
  static pauseAnimation(track: KeyframeAnimationTrack<object> | string);
  /**
   * 暂停一个target正在播放的动画
   * @param {Object} target 正在执行动画的target
   */
  static pauseAnimation(target: object);
  /**
   * 暂停一个具名队列正在播放的动画
   * @param {Object} target 正在执行动画的target
   */
  static pauseAnimation(queueName: string);
  static pauseAnimation(object: object | KeyframeAnimationTrack<object> | string) {
    if (object instanceof KeyframeAnimationTrack) {
      //暂停一个track
      object.pause();
      object.trigger("pause");
    } else if (this.activeAnimationMap.has(object)) {
      //暂停一个target对应的所有track
      const track = this.activeAnimationMap.get(object);
      track.pause();
      track.trigger("pause");
    }
  }

  /**
   * 暂停所有KeyframeAnimation动画
   */
  static pauseAll() {
    for (const key of this.activeAnimationMap.keys()) {
      this.pauseAnimation(<object>key);
    }
  }

  /**
   * 继续一个KeyframeAnimation动画
   * @param {KeyframeAnimationTrack} track KeyframeAnimationTrack对象
   */
  static resumeAnimation(track: KeyframeAnimationTrack<object>);
  /**
   * 继续一个target所有正在播放的动画
   * @param {Object} target 正在执行动画的target
   */
  static resumeAnimation(target: object);
  static resumeAnimation(object: object | KeyframeAnimationTrack<object>) {
    if (object instanceof KeyframeAnimationTrack) {
      //继续一个track
      object.resume();
      object.trigger("resume");
    } else if (this.activeAnimationMap.has(object)) {
      //继续一个target对应的所有track
      const track = this.activeAnimationMap.get(object);
      track.resume();
      track.trigger("resume");
    }
  }

  /**
   * 继续所有KeyframeAnimation动画
   */
  static resumeAll() {
    for (const key of this.activeAnimationMap.keys()) {
      this.resumeAnimation(<object>key);
    }
  }

  /**
   * 每帧需要执行的动画
   */
  static apf() {
    this.activeAnimationMap.forEach((track, target) => {
      const time = new Date().getTime();
      if (track.paused) return;
      const isActive = track.apf(time);
      if (!isActive) {
        track.trigger("complete");
        if (this.animationQueue.has(target)) {
          const track = this.deQueue(<object>target);
          if (track) {
            this.activeAnimationMap.set(target, track);
            track.start();
            return;
          }
        }
        this.activeAnimationMap.delete(target);
      }
    });
  }

  /**
   * 停止所有动画，清空动画队列，移除所有已注册的动画
   */
  static reset() {
    this.animations = {};
    this.animationQueue = new Map<object, AnimationTrack[]>();
    this.stopAll();
    this.activeAnimationMap = new Map<object, AnimationTrack>();
  }
}
