import { _decorator } from "cc";
import { EntityContainer } from "./EntityContainer";
import { Card } from "../Card/Card";
import GamePools from "../Pool/GamePools";
import { CardEntity } from "../Card/CardEntity";
const { ccclass, property } = _decorator;

@ccclass("CardGroupEntity")
export class CardGroupEntity extends EntityContainer<CardEntity> {
  init() {}

  onDataAdded(card: Card): void {
    if (!card.entity) {
      card.entity = GamePools.cardPool.get();
    }
    this.node.addChild(card.entity.node);
  }

  onDataRemoved(card: Card): void {}

  onAllDataRemoved(): void {}
}
