import { _decorator, Component, Node } from "cc";
import ws from "../Utils/WebSocket";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  onLoad() {
    ws.createConnection();
    ws.setHeartBeatFunction(() => {
      ws.send("heart_tos");
    });
  }

  update(deltaTime: number) {}
}
