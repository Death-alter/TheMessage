import { _decorator, tween, Node, Vec3, Tween } from "cc";
import { GameObjectContainer } from "./GameObjectContainer";
import { CardObject } from "../Card/CardObject";
import { GameCard } from "../Card/type";
import { GameObject } from "../../GameObject";
const { ccclass, property } = _decorator;

@ccclass("CardGroupObject")
export class CardGroupObject extends GameObjectContainer<GameObject<GameCard>> {
  init() {}

  onDataAdded(data: GameCard): void {}

  onDataRemoved(data: GameCard): void {}

  onAllDataRemoved(): void {}
}
