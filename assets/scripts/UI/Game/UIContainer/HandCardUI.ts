import { _decorator, CCInteger, Component, instantiate, Prefab, UITransform, Vec3, Node, tween } from "cc";
import { CardUI } from "../Card/CardUI";
import EventTarget from "../../../Event/EventTarget";
import { ProcessEvent } from "../../../Event/type";
import { UIContainer } from "./UIContainer";
import { Card } from "../../../Data/Cards/Card";
const { ccclass, property } = _decorator;

@ccclass("HandCardUI")
export class HandCardUI extends UIContainer<CardUI> {
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
          item.getComponent(CardUI).selected = false;
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

  addCard(card: Card) {
    card.UI.position = new Vec3(this._width / 2 + this._childWith / 2, 0, 0);
    this.node.addChild(card.UI.node);
    this.refresh();
  }

  removeCard(card: Card) {
    card.UI.node.removeFromParent();
    this.refresh();
  }

  refresh() {
    const offset = this._childWith / 2 - this._width / 2;

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
