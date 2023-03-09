import { _decorator, Component, director } from "cc";
import ws from "../Utils/WebSocket";
import Protos from "../Network/Protos";
import EventTarget from "../Event/EventTarget";
import { ProcessEvent, NetworkEventToS } from "../Event/type";

const { ccclass, property } = _decorator;

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  onLoad() {
    director.addPersistRootNode(this.node);

    ws.createConnection();
    ws.setHeartBeatFunction(() => {
      ws.send("heart_tos");
    });

    for (let protoName in Protos) {
      ws.on(protoName, Protos[protoName]);
    }

    for (let eventName in NetworkEventToS) {
      EventTarget.on(NetworkEventToS[eventName], (data) => {
        ws.send(NetworkEventToS[eventName], data);
      });
    }
  }
}
