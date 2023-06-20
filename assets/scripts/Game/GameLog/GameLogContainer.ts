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
    if (!data.gameObject) {
      data.gameObject = GamePools.logMessagePool.get();
    }
    this.node.addChild(data.gameObject.node);
    data.gameObject.setText(data.text);
    data.gameObject.show(3).then(() => {
      GamePools.logMessagePool.put(data.gameObject);
      data.gameObject = null;
    });
  }
  onDataRemoved(data: GameLog): void {}
  onAllDataRemoved(): void {}
}
