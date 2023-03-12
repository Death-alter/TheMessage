import { _decorator, CCInteger, Component, instantiate, Prefab, UITransform, Vec3, Node, tween } from "cc";
import { GameCard } from "../../Cards/type";
import { CardUI } from "./Card/CardUI";
import EventTarget from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("HandCardUI")
export class HandCardUI extends Component {
  @property(Prefab)
  cardPrefab: Prefab | null;
  @property({ type: CCInteger })
  spacingX: number = 0;

  private _cardList: GameCard[] = [];
  private _maxLength: number;
  private _childWith: number;
  private _width: number;

  get cardList() {
    return this._cardList;
  }

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
    if (this._cardList.length) {
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

  addCard(card: GameCard) {
    this.cardList.push(card);
    const CardNode = instantiate(this.cardPrefab);
    CardNode.getComponent(CardUI).init(card);
    CardNode.position = new Vec3(this._width / 2 + this._childWith / 2, 0, 0);
    this.node.addChild(CardNode);
    this.refresh();
  }

  refresh() {
    const offset = this._childWith / 2 - this._width / 2;

    //超出宽度后开始堆叠
    if (this._cardList.length > this._maxLength) {
      for (let i = 0; i < this._cardList.length; i++) {
        const x = offset - (2 * i * offset) / (this.cardList.length - 1);
        if (x !== this.node.children[i].position.x) {
          tween(this.node.children[i])
            .to(0.5, { position: new Vec3(x, this.node.children[i].position.y, 0) })
            .start();
        }
      }
    } else {
      for (let i = 0; i < this._cardList.length; i++) {
        const x = i * (this.spacingX + this._childWith) + offset;
        if (x !== this.node.children[i].position.x) {
          tween(this.node.children[i])
            .to(0.5, { position: new Vec3(x, this.node.children[i].position.y, 0) })
            .start();
        }
      }
    }
  }
}
