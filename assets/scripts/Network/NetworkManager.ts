import { _decorator, Component, director } from "cc";
import ws from "../Utils/WebSocket";
import { EventMapper } from "../Event/EventMapper";
import { NetworkEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { NetworkEventToS, NetworkEventToC, ProcessEvent } from "../Event/type";

const { ccclass } = _decorator;

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  onLoad() {
    director.addPersistRootNode(this.node);

    this.createConnection();

    for (const eventName in NetworkEventToC) {
      ws.on(NetworkEventToC[eventName], (data) => {
        NetworkEventCenter.emit(NetworkEventToC[eventName], data);
      });
    }

    for (const eventName in NetworkEventToS) {
      NetworkEventCenter.on(NetworkEventToS[eventName], (data) => {
        if (ws.connected) {
          ws.send(NetworkEventToS[eventName], data);
        } else {
          this.createConnection()
            .then(() => {
              ws.send(NetworkEventToS[eventName], data);
            })
            .catch(() => {
            });
        }
      });
    }

    NetworkEventCenter.on(NetworkEventToC.NOTIFY_KICKED_TOC, () => {
      if (director.getScene().name !== "login") {
        director.loadScene("login", () => {
          this.reconnect();
        });
      }
    });

    EventMapper.init();
  }

  createConnection() {
    const p = ws.createConnection();
    ws.setHeartBeatFunction(() => {
      ws.send("heart_tos");
    });
    ws.on("disconnect", () => {
      if (director.getScene().name !== "login") {
        director.loadScene("login");
      }
    });
    ws.on("network_error", () => {
      ProcessEventCenter.emit(ProcessEvent.NETWORK_ERROR, { msg: "未能连接到服务器，请检查网络状态" });
    });
    return p;
  }

  closeConnection() {
    ws.closeConnection();
  }

  reconnect() {
    ws.reconnect();
  }
}
