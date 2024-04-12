import { Game, _decorator, game } from "cc";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { EntityContainer } from "../../../Components/Container/EntityContainer";
import { GameLogMessageEntity } from "../../../Components/GameLog/GameLogMessageEntity";
import GamePools from "../../../Components/Pool/GamePools";
const { ccclass, property } = _decorator;

@ccclass("GameLogContainer")
export class GameLogContainer extends EntityContainer<GameLogMessageEntity> {
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
      if (!data.entity) {
        data.entity = GamePools.logMessagePool.get();
      }
      this.node.addChild(data.entity.node);
      data.entity.setText(data.text);
      data.entity.show(3).then(() => {
        this.data.removeData(data);
      });
    } else {
      this.data.removeData(data);
    }
  }
  onDataRemoved(data: GameLog): void {
    if (data.entity) {
      GamePools.logMessagePool.put(data.entity);
      data.entity = null;
    }
  }
  onAllDataRemoved(): void {}
}
