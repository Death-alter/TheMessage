import { Game, _decorator, game } from "cc";
import { GameLog } from "./GameLog";
import { GameObjectContainer } from "../Container/GameObjectContainer";
import { GameLogMessageObject } from "./GameLogMessageObject";
import GamePools from "../../GameManager/GamePools";
import { GameLogList } from "./GameLogList";
const { ccclass, property } = _decorator;

@ccclass("GameLogContainer")
export class GameLogContainer extends GameObjectContainer<GameLogMessageObject> {
  public showLog: boolean = true;

  onLoad() {
    game.on(Game.EVENT_SHOW, this.startShowLog, this);
    game.on(Game.EVENT_HIDE, this.stopShowLog, this);
  }

  onDestroy() {
    game.off(Game.EVENT_SHOW, this.startShowLog, this);
    game.off(Game.EVENT_HIDE, this.stopShowLog, this);
  }

  startShowLog() {
    this.showLog = true;
  }

  stopShowLog() {
    this.showLog = false;
  }

  init() {}
  onDataAdded(data: GameLog): void {
    if (this.showLog) {
      if (!data.gameObject) {
        data.gameObject = GamePools.logMessagePool.get();
      }
      this.node.addChild(data.gameObject.node);
      data.gameObject.setText(data.text);
      data.gameObject.show(3).then(() => {
        this.data.removeData(data);
      });
    } else {
      this.data.removeData(data);
    }
  }
  onDataRemoved(data: GameLog): void {
    if (data.gameObject) {
      GamePools.logMessagePool.put(data.gameObject);
      data.gameObject = null;
    }
  }
  onAllDataRemoved(): void {}
}
