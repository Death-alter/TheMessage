import { _decorator, Component, Label, Graphics, tween, UIOpacity, Node, UITransform, Size, Tween } from "cc";
import { GameLog } from "./GameLog";
import { GameObjectContainer } from "../Container/GameObjectContainer";
import { GameLogMessageObject } from "./GameLogMessageObject";
import { GameEventCenter } from "../../Event/EventTarget";
import { GameEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("GameLogContainer")
export class GameLogContainer extends GameObjectContainer<GameLogMessageObject> {
  init() {}
  onDataAdded(data: GameLog): void {
    data.gameObject.init();
    data.gameObject.show(3);
  }
  onDataRemoved(data: GameLog): void {}
  onAllDataRemoved(): void {}
}
