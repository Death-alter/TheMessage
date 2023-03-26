import { EventTarget } from "cc";
import { ProcessEvent, GameEvent, NetworkEventToS, NetworkEventToC } from "./type";

export class EventCenter<T = string, D = any> {
  private eventTarget: EventTarget;

  constructor() {
    this.eventTarget = new EventTarget();
  }

  /**
   * 监听事件
   * @param type
   * @param callback
   */
  public on(type: T, callback, target?: any, once?: boolean): void {
    this.eventTarget.on(type as string, callback, target, once);
  }

  /**
   * 触发事件
   * @param type
   * @param args[]
   */
  public emit(type: T, arg0?: D, arg1?: D, arg2?: D, arg3?: D, arg4?: D) {
    console.log(type);
    this.eventTarget.emit(type as string, arg0, arg1, arg2, arg3, arg4);
  }

  /**
   * 判断是否监听某个事件
   * @param type
   */
  public hasEventListener($type: T): boolean {
    return this.eventTarget.hasEventListener($type as string);
  }

  /**
   * 取消监听
   * @param type
   * @param callback
   * @param target
   */
  public off(type: T, callback?, target?: any): void {
    this.eventTarget.off(type as string, callback, target);
  }

  /**
   * 监听事件一次
   * @param type
   * @param callback
   * @param target
   */
  public once(type: T, callback, target?: any): void {
    this.eventTarget.once(type as string, callback, target);
  }
}

export const GameEventCenter = new EventCenter<GameEvent, any>();
export const ProcessEventCenter = new EventCenter<ProcessEvent, any>();
export const NetworkEventCenter = new EventCenter<NetworkEventToS | NetworkEventToC, any>();
