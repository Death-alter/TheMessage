import { _decorator } from "cc";
import { GameLog } from "./GameLog";
import { GameObjectContainer } from "../Container/GameObjectContainer";
import { GameLogMessageObject } from "./GameLogMessageObject";
import GamePools from "../../GameManager/GamePools";
const { ccclass, property } = _decorator;

@ccclass("GameLogContainer")
export class GameLogContainer extends GameObjectContainer<GameLogMessageObject> {
  init() {}
  onDataAdded(data: GameLog): void {
    data.gameObject = GamePools.logMessagePool.get();
    data.gameObject.init();
    data.gameObject.setText(data.text);
    data.gameObject.show(3).then(() => {
      GamePools.logMessagePool.put(data.gameObject);
      data.gameObject = null;
    });
  }
  onDataRemoved(data: GameLog): void {}
  onAllDataRemoved(): void {}
}
