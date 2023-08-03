import { _decorator, Component, director } from "cc";
import ws from "../Utils/WebSocket";
import { EventMapper } from "../Event/EventMapper";
import { NetworkEventCenter } from "../Event/EventTarget";
import { NetworkEventToS, NetworkEventToC } from "../Event/type";

const { ccclass } = _decorator;

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  onLoad() {
    director.addPersistRootNode(this.node);

    this.createConnection();

    for (let eventName in NetworkEventToC) {
      ws.on(NetworkEventToC[eventName], (data) => {
        NetworkEventCenter.emit(NetworkEventToC[eventName], data);
      });
    }

    for (let eventName in NetworkEventToS) {
      NetworkEventCenter.on(NetworkEventToS[eventName], (data) => {
        ws.send(NetworkEventToS[eventName], data);
      });
    }

    NetworkEventCenter.on(NetworkEventToC.NOTIFY_KICKED_TOC, () => {
      director.loadScene("login", () => {
        this.closeConnection();
      });
    });

    EventMapper.init();
  }

  createConnection() {
    ws.createConnection();
    ws.setHeartBeatFunction(() => {
      ws.send("heart_tos");
    });
    ws.on("disconnect", () => {
      director.loadScene("login");
    });
  }

  closeConnection() {
    ws.closeConnection();
  }

  reconnect() {
    ws.reconnect();
  }
}
