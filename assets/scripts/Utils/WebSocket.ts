import config from "../config";
import ProtoHelper from "../Network/ProtoHelper";

interface WebSocketOption {
  url: string;
}

interface WebSocketCallBack {
  (data: { [index: string]: any | null }): void;
}

export class WS {
  private url: string;
  private ws: WebSocket | null = null;
  private eventList: { [index: string]: Array<WebSocketCallBack> } = {
    connect: [],
    reconnect: [],
    disconnect: [],
    network_error: [],
    error: [],
  };
  private initList: Array<{ (): void }> = [];
  private heartBeatTimer = 0;
  private retryTime = 0;
  private autoReconnect = true;

  private heartBeat: { (): void } | null = null;

  public static readonly heartBeatInterval: number = config.heartBeatInterval; //单位：秒
  public static readonly retryLimit: number = config.maxRetryTimes; //最大重连次数

  constructor(option: WebSocketOption) {
    this.url = option.url;
    if (!this.url) {
      console.error("没有设置url，无法创建socket连接");
    }
  }

  get bufferedAmount() {
    return this.ws?.bufferedAmount;
  }

  get state() {
    return this.ws?.readyState;
  }

  get connecting() {
    return this.ws && this.state === WebSocket.CONNECTING;
  }

  get connected() {
    return this.ws && this.state === WebSocket.OPEN;
  }

  createConnection() {
    return new Promise((resolve, reject) => {
      if (this.connecting) {
        return;
      }
      console.log("正在连接到：" + this.url);
      if (this.ws == null) {
        this.retryTime++;
        this.ws = new WebSocket(this.url);
        this.autoReconnect = true; //连接以后开启自动重连
        this.ws.onopen = (event) => {
          this.retryTime = 0;
          for (const func of this.initList) {
            func();
          }
          this.initList = [];
          for (const callback of this.eventList.connect) {
            callback({});
          }
          if (this.heartBeat !== null) {
            this.heartBeatTimer = window.setInterval(this.heartBeat, WS.heartBeatInterval * 1000);
          }
          console.log("ws已连接");
          resolve(event);
        };

        this.ws.onmessage = (event) => {
          ProtoHelper.decode(event.data).then((res: any) => {
            console.log(res);
            if (this.eventList[res.protoName]) {
              for (const callback of this.eventList[res.protoName]) {
                callback(res.data);
              }
            }
          });
        };

        this.ws.onclose = (event) => {
          window.clearInterval(this.heartBeatTimer);
          this.ws = null;
          for (const callback of this.eventList.disconnect) {
            callback({});
          }
          if (this.retryTime == 1) {
            console.log("网络连接已断开，正在尝试重新连接");
          }
          console.log("ws已断开");
          if (this.autoReconnect) {
            this.createConnection().then(() => {
              for (const callback of this.eventList.reconnect) {
                callback({});
              }
            });
          }
        };

        this.ws.onerror = (error) => {
          for (const callback of this.eventList.error) {
            callback({});
          }
          if (this.state !== WebSocket.OPEN) {
            if (this.retryTime >= WS.retryLimit) {
              for (const callback of this.eventList.network_error) {
                callback({});
              }
              this.autoReconnect = false;
              console.log("无法连接到服务器，请稍检查网络连接并刷新页面重试");
              return;
            }
            this.reconnect();
            reject(error);
          }
          console.log(error);
        };
      }
    });
  }

  reconnect() {
    this.ws?.close();
  }

  closeConnection() {
    if (this.ws) {
      this.autoReconnect = false; //手动断开连接不自动重连
      this.ws.close();
    }
  }

  send(protoName: string, data: object = {}) {
    console.log({ protoName, data });
    const protoData = ProtoHelper.encode(protoName, data);
    if (this.connecting) {
      this.initList.push(() => {
        this.ws?.send(protoData);
      });
    } else {
      this.ws?.send(protoData);
    }
  }

  setHeartBeatFunction(func: { (): void }) {
    this.heartBeat = func;
    if (this.ws && this.state === WebSocket.OPEN) {
      if (this.heartBeatTimer) {
        window.clearInterval(this.heartBeatTimer);
      }
      this.heartBeatTimer = window.setInterval(this.heartBeat, WS.heartBeatInterval * 1000);
    }
  }

  on(name: string, callback: WebSocketCallBack) {
    if (!this.eventList[name]) {
      this.eventList[name] = [];
    }
    this.eventList[name].push(callback);
  }

  off(name: string, callback?: WebSocketCallBack) {
    if (this.eventList[name]) {
      if (callback) {
        for (let i = 0; i < this.eventList[name].length; i++) {
          if (this.eventList[name][i] === callback) {
            this.eventList[name].splice(i, 1);
            break;
          }
        }
      } else {
        delete this.eventList[name];
      }
    }
  }
}

export default new WS({ url: config.webSocketUrl });
