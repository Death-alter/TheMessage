import { _decorator, CCInteger, instantiate, Prefab, UITransform, Vec3, Node, tween } from "cc";
import { CardObject } from "../Card/CardObject";
import EventTarget from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
import { GameObjectContainer } from "./GameObjectContainer";
import { Card } from "../../Data/Cards/Card";
const { ccclass, property } = _decorator;

@ccclass("HandCardContianer")
export class HandCardContianer extends GameObjectContainer<CardObject, Card> {
  @property(Prefab)
  cardPrefab: Prefab | null;
  @property({ type: CCInteger })
  spacingX: number = 0;

  private _maxLength: number;
  private _childWith: number;
  private _width: number;

  onEnable() {
    this.node.on(Node.EventType.SIZE_CHANGED, () => {
      this.onResize();
    });
    EventTarget.on(ProcessEvent.SELECT_HAND_CARD, (node) => {
      for (let item of this.node.children) {
        if (item !== node) {
          item.getComponent(CardObject).selected = false;
        }
      }
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
    this.scheduleOnce(this.refresh, 0);
  }

  onDataRemoved() {
    this.scheduleOnce(this.refresh, 0);
  }

  onAllDataRemoved() {}

  refresh() {
    const offset = this._childWith / 2 - this._width / 2;
    console.log(this._childWith, this._width);

    //超出宽度后开始堆叠
    if (this.data.list.length > this._maxLength) {
      for (let i = 0; i < this.data.list.length; i++) {
        const x = offset - (2 * i * offset) / (this.data.list.length - 1);
        if (x !== this.node.children[i].position.x) {
          tween(this.node.children[i])
            .to(0.5, { position: new Vec3(x, this.node.children[i].position.y, 0) })
            .start();
        }
      }
    } else {
      for (let i = 0; i < this.data.list.length; i++) {
        const x = offset + i * (this.spacingX + this._childWith);
        if (x !== this.node.children[i].position.x) {
          tween(this.node.children[i])
            .to(0.5, { position: new Vec3(x, this.node.children[i].position.y, 0) })
            .start();
        }
      }
    }
  }
}
