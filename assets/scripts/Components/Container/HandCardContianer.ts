import { _decorator, CCInteger, instantiate, Prefab, UITransform, Vec3, Node } from "cc";
import { CardEntity } from "../Card/CardEntity";
import { UIEventCenter } from "../../Event/EventTarget";
import { UIEvent } from "../../Event/type";
import { EntityContainer } from "./EntityContainer";
import { Card } from "../Card/Card";
import { HandCardList } from "./HandCardList";
import GamePools from "../Pool/GamePools";
import { OuterGlow } from "../Utils/OuterGlow";
import { CardUsableStatus } from "../Card/type";
import { KeyframeAnimationManager } from "../../Scenes/Game/AnimationLayer/KeyframeAnimation";

const { ccclass, property } = _decorator;

@ccclass("HandCardContianer")
export class HandCardContianer extends EntityContainer<CardEntity> {
  @property(Prefab)
  cardPrefab: Prefab | null;
  @property({ type: CCInteger })
  spacingX: number = 0;

  private _maxLength: number;
  private _childWith: number;
  private _width: number;
  private filter: (card: Card) => CardUsableStatus;

  onEnable() {
    this.node.on(Node.EventType.SIZE_CHANGED, () => {
      this.onResize();
    });
  }

  onDisable() {
    this.node.off(Node.EventType.SIZE_CHANGED);
  }

  onResize() {
    this._width = this.node.getComponent(UITransform).width;
    this._childWith = instantiate(this.cardPrefab).getComponent(UITransform).width;
    this._maxLength = Math.floor(this._width / (this._childWith + this.spacingX));
  }

  init() {
    this.onResize();
    this.node.removeAllChildren();
    for (const card of this.data.list) {
      this.addCardNode(<Card>card);
      card.entity.node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          this.selectCard(<Card>card);
        },
        this,
      );
    }
    this.scheduleOnce(this.refresh, 0);
  }

  onDataAdded(card: Card) {
    this.addCardNode(card);
    card.entity.node.on(
      Node.EventType.TOUCH_END,
      (event) => {
        if (card.entity.usableStatus !== CardUsableStatus.USABLE) return;
        this.selectCard(card);
      },
      this,
    );
    if (this.filter) card.entity.usableStatus = this.filter(card);
    this.scheduleOnce(this.refresh, 0);
  }

  addCardNode(card: Card) {
    if (card.entity) {
      card.entity.data = null;
      GamePools.cardPool.put(card.entity);
    }
    card.entity = GamePools.cardPool.get();
    card.entity.node.scale = new Vec3(1, 1, 1);
    card.entity.node.angle = 0;
    this.node.addChild(card.entity.node);
    card.entity.node.position = new Vec3(this._width / 2 + this._childWith / 2, 0, 0);
  }

  onDataRemoved(card: Card) {
    card.entity.getComponentInChildren(OuterGlow).closeOuterGlow();
    card.entity.node.off(Node.EventType.TOUCH_END);
    this.scheduleOnce(this.refresh, 0);
  }

  onAllDataRemoved() {}

  refresh() {
    const offset = this._childWith / 2 - this._width / 2;
    const data = <HandCardList>this.data;

    //超出宽度后开始堆叠
    if (data.list.length > this._maxLength) {
      for (let i = 0; i < data.list.length; i++) {
        const node = data.list[i].entity && data.list[i].entity.node;
        if (!node) continue;
        const x = offset - (2 * i * offset) / (data.list.length - 1);
        if (data.selectedCards.isSelected(data.list[i])) {
          node.setPosition(new Vec3(node.position.x, 20, 0));
          data.list[i].entity.getComponentInChildren(OuterGlow).openOuterGlow();
        } else {
          node.setPosition(new Vec3(node.position.x, 0, 0));
          data.list[i].entity.getComponentInChildren(OuterGlow).closeOuterGlow();
        }
        if (x !== node.position.x) {
          KeyframeAnimationManager.playAnimation(
            {
              target: node,
              animation: [
                {
                  attribute: "position",
                  to: new Vec3(x, node.position.y, 0),
                  duration: 0.5,
                },
              ],
            },
            null,
            "mix",
            0,
          );
        }
      }
    } else {
      for (let i = 0; i < data.list.length; i++) {
        const node = data.list[i].entity && data.list[i].entity.node;
        if (!node) continue;
        const x = offset + i * (this.spacingX + this._childWith);
        if (data.selectedCards.isSelected(data.list[i])) {
          node.setPosition(new Vec3(node.position.x, 20, 0));
          data.list[i].entity.getComponentInChildren(OuterGlow).openOuterGlow();
        } else {
          node.setPosition(new Vec3(node.position.x, 0, 0));
          data.list[i].entity.getComponentInChildren(OuterGlow).closeOuterGlow();
        }
        if (x !== node.position.x) {
          KeyframeAnimationManager.playAnimation(
            {
              target: node,
              animation: [
                {
                  attribute: "position",
                  to: new Vec3(x, node.position.y, 0),
                  duration: 0.5,
                },
              ],
            },
            null,
            "mix",
            0,
          );
        }
      }
    }
  }

  selectCard(card: Card) {
    const data = <HandCardList>this.data;
    if (data.selectedCards.limit <= 0 || data.selectedCards.locked) return;
    if (data.selectedCards.isSelected(card)) {
      data.selectedCards.deselect(card);
      UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD, card);
    } else {
      const flag = data.selectedCards.select(card);
      if (flag) {
        UIEventCenter.emit(UIEvent.SELECT_HAND_CARD, card);
      } else {
        const firstCard = data.selectedCards.list[0];
        if (firstCard) {
          data.selectedCards.deselect(firstCard);
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD, firstCard);
        }
        data.selectedCards.select(card);
        UIEventCenter.emit(UIEvent.SELECT_HAND_CARD, card);
      }
    }
    this.scheduleOnce(this.refresh, 0);
  }

  setHandCardsUsable(filter: (card: Card) => CardUsableStatus) {
    this.filter = filter;
    for (const handCard of this.data.list) {
      handCard.entity.usableStatus = filter(<Card>handCard);
    }
  }

  refreshHandCardsUseable() {
    this.filter = null;
    for (const handCard of this.data.list) {
      handCard.entity && (handCard.entity.usableStatus = CardUsableStatus.USABLE);
    }
  }

  resetSelectCard() {
    (<HandCardList>this.data).selectedCards.clear();
    this.scheduleOnce(this.refresh, 0);
  }
}
