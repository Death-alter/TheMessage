import { _decorator, CCInteger, instantiate, Prefab, UITransform, Vec3, Node, tween } from "cc";
import { CardObject } from "../Card/CardObject";
import { ProcessEventCenter } from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { GameObjectContainer } from "./GameObjectContainer";
import { Card } from "../Card/Card";
import { HandCardList } from "./HandCardList";
const { ccclass, property } = _decorator;

@ccclass("HandCardContianer")
export class HandCardContianer extends GameObjectContainer<CardObject> {
  @property(Prefab)
  cardPrefab: Prefab | null;
  @property({ type: CCInteger })
  spacingX: number = 0;
  @property(Node)
  cardActionNode: Node | null;

  private _maxLength: number;
  private _childWith: number;
  private _width: number;

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
    if (this.data.list.length) {
      this._childWith = this.node.getComponentInChildren(UITransform).width;
    } else {
      this._childWith = instantiate(this.cardPrefab).getComponent(UITransform).width;
      this._maxLength = Math.floor(this._width / (this._childWith + this.spacingX));
    }
  }

  init() {
    this.onResize();
    this.refresh();
  }

  onDataAdded(card: Card) {
    if (!card.gameObject) return;
    card.gameObject.node.position = new Vec3(this._width / 2 + this._childWith / 2, 0, 0);
    card.gameObject.node.on(
      Node.EventType.TOUCH_END,
      (event) => {
        this.selectCard(card);
      },
      this
    );
    this.scheduleOnce(this.refresh, 0);
  }

  onDataRemoved(card: Card) {
    if (!card.gameObject) return;
    card.gameObject.node.off(Node.EventType.TOUCH_END);
    this.scheduleOnce(this.refresh, 0);
  }

  onAllDataRemoved() {}

  refresh() {
    const offset = this._childWith / 2 - this._width / 2;
    const data = <HandCardList>this.data;

    //超出宽度后开始堆叠
    if (this.data.list.length > this._maxLength) {
      for (let i = 0; i < this.data.list.length; i++) {
        const node = this.data.list[i].gameObject.node;
        const x = offset - (2 * i * offset) / (this.data.list.length - 1);
        if (data.selectedCards.isSelected(<Card>this.data.list[i])) {
          node.setPosition(new Vec3(node.position.x, 20, 0));
          (<Card>this.data.list[i]).gameObject.openOuterGlow();
        } else {
          node.setPosition(new Vec3(node.position.x, 0, 0));
          (<Card>this.data.list[i]).gameObject.closeOuterGlow();
        }
        if (x !== node.position.x) {
          tween(node)
            .to(0.5, { position: new Vec3(x, node.position.y, 0) })
            .start();
        }
      }
    } else {
      for (let i = 0; i < this.data.list.length; i++) {
        const node = this.data.list[i].gameObject.node;
        const x = offset + i * (this.spacingX + this._childWith);
        if (data.selectedCards.isSelected(<Card>this.data.list[i])) {
          node.setPosition(new Vec3(node.position.x, 20, 0));
          (<Card>this.data.list[i]).gameObject.openOuterGlow();
        } else {
          node.setPosition(new Vec3(node.position.x, 0, 0));
          (<Card>this.data.list[i]).gameObject.closeOuterGlow();
        }
        if (x !== node.position.x) {
          tween(node)
            .to(0.5, { position: new Vec3(x, node.position.y, 0) })
            .start();
        }
      }
    }
  }

  selectCard(card: Card) {
    const data = <HandCardList>this.data;
    if (data.selectedCards.isSelected(card)) {
      data.selectedCards.deselect(card);
      ProcessEventCenter.emit(ProcessEvent.CANCEL_SELECT_HAND_CARD, card);
    } else {
      const flag = data.selectedCards.select(card);
      if (flag) {
        ProcessEventCenter.emit(ProcessEvent.SELECT_HAND_CARD, card);
      } else {
        const firstCard = data.selectedCards.list[0];
        data.selectedCards.deselect(firstCard);
        ProcessEventCenter.emit(ProcessEvent.CANCEL_SELECT_HAND_CARD, card);
        data.selectedCards.select(card);
        ProcessEventCenter.emit(ProcessEvent.SELECT_HAND_CARD, card);
      }
    }
    this.scheduleOnce(this.refresh, 0);
  }

  resetSelectCard() {
    (<HandCardList>this.data).selectedCards.clear();
    this.scheduleOnce(this.refresh, 0);
  }
}
