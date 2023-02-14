import { _decorator, Component, Node } from "cc";
import ws from "../Utils/WebSocket";

const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
  start() {
    ws.createConnection();
    ws.send("heart_tos");
    // ws.setHeartBeatFunction(() => {});
  }

  update(deltaTime: number) {}
}
