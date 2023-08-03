import { _decorator, Component, director, find, game, Game, sys } from "cc";
import ws from "../Utils/WebSocket";
import { EventMapper } from "../Event/EventMapper";
import { NetworkEventCenter } from "../Event/EventTarget";
import { NetworkEventToS, NetworkEventToC } from "../Event/type";
import config from "../config";
import md5 from "ts-md5";
import { DataManager } from "../GameManager/DataManager";
import { GameUI } from "../UI/Game/GameWindow/GameUI";

const { ccclass } = _decorator;

@ccclass("NetworkManager")
export class NetworkManager extends Component {
  private timer: number = 0;

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
        this.reconnect();
      });
    });

    EventMapper.init();

    // if (sys.isNative) {
    //   game.on(Game.EVENT_HIDE, () => {
    //     if (director.getScene().name === "game") {
    //       this.timer = setTimeout(this.closeConnection, 15 * 1000);
    //     }
    //   });

    //   game.on(Game.EVENT_SHOW, () => {
    //     if (director.getScene().name === "game") {
    //       if (ws.state !== WebSocket.OPEN) {
    //         this.node.getComponent(DataManager).clearData();
    //         director.loadScene("login", () => {
    //           this.createConnection();
    //         });
    //       } else {
    //         clearTimeout(this.timer);
    //       }
    //     }
    //   });
    // }
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
