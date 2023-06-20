import { _decorator } from "cc";
import { GameObjectContainer } from "./GameObjectContainer";
import { GameObject } from "../../GameObject";
import { Card } from "../Card/Card";
import GamePools from "../../GameManager/GamePools";
const { ccclass, property } = _decorator;

@ccclass("CardGroupObject")
export class CardGroupObject extends GameObjectContainer<GameObject<Card>> {
  init() {}

  onDataAdded(card: Card): void {
    if (!card.gameObject) {
      card.gameObject = GamePools.cardPool.get();
    }
    this.node.addChild(card.gameObject.node);
  }

  onDataRemoved(card: Card): void {}

  onAllDataRemoved(): void {}
}
