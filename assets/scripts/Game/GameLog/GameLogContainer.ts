import { _decorator, Component, Label, Graphics, tween, UIOpacity, Node, UITransform, Size, Tween } from "cc";
import { GameLog } from "./GameLog";
import { GameObjectContainer } from "../Container/GameObjectContainer";
import { GameLogMessageObject } from "./GameLogMessageObject";
const { ccclass, property } = _decorator;

@ccclass("GameLogContainer")
export class GameLogContainer extends GameObjectContainer<GameLogMessageObject, GameLog> {
  init() {}
  onDataAdded(data: GameLog): void {}
  onDataRemoved(data: GameLog): void {}
  onAllDataRemoved(): void {}
}
