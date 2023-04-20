import { _decorator } from "cc";
import { GameObjectContainer } from "./GameObjectContainer";
import { GameObject } from "../../GameObject";
import { Card } from "../Card/Card";
const { ccclass, property } = _decorator;

@ccclass("CardGroupObject")
export class CardGroupObject extends GameObjectContainer<GameObject<Card>> {
  init() {}

  onDataAdded(data: Card): void {}

  onDataRemoved(data: Card): void {}

  onAllDataRemoved(): void {}
}
