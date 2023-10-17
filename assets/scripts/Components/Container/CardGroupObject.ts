import { _decorator } from "cc";
import { GameObjectContainer } from "./GameObjectContainer";
import { Card } from "../Card/Card";
import GamePools from "../Pool/GamePools";
import { CardObject } from "../Card/CardObject";
const { ccclass, property } = _decorator;

@ccclass("CardGroupObject")
export class CardGroupObject extends GameObjectContainer<CardObject> {
  init() {}

  onDataAdded(card: Card): void {

  }

  onDataRemoved(card: Card): void {}

  onAllDataRemoved(): void {}
}
