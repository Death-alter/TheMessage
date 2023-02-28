import { _decorator, Component, Node } from "cc";
import ws from "../Utils/WebSocket";
import Protos from "../Network/Protos";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  onLoad() {
    ws.createConnection();
    ws.setHeartBeatFunction(() => {
      ws.send("heart_tos");
    });

    for (let protoName in Protos) {
      ws.on(protoName, Protos[protoName]);
    }
  }

  update(deltaTime: number) {}
}
