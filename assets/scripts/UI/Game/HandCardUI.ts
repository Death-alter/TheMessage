import { _decorator, CCInteger, Component, instantiate, Prefab, UITransform, Vec3, Node } from "cc";
import { GameCard } from "../../Cards/type";
import { CardUI } from "./Card/CardUI";
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

  get cardList() {
    return this._cardList;
  }

  onLoad() {
    this.node.on(Node.EventType.SIZE_CHANGED, this.init, this);
  }

  init() {
    if (this._cardList.length) {
      this._childWith = this.node.getComponentInChildren(UITransform).width;
    } else {
      this._childWith = instantiate(this.cardPrefab).getComponent(UITransform).width;
    }
    const width = this.node.getComponent(UITransform).width;
    this._maxLength = Math.floor(width / (this._childWith + this.spacingX));
    this.refresh();
  }

  addCard(card: GameCard) {
    this.cardList.push(card);
    const CardNode = instantiate(this.cardPrefab);
    CardNode.getComponent(CardUI).init(card);
    this.node.addChild(CardNode);
    this.refresh();
    console.log(this.node);
  }

  refresh() {
    const width = this.node.getComponent(UITransform).width;

    //超出宽度后开始堆叠
    if (this._cardList.length > this._maxLength) {
      const stackLength =
        (this._childWith * this._cardList.length + this.spacingX * (this._cardList.length - 1) - width) /
        (this._cardList.length - 1);
      for (let i = 0; i < this._cardList.length; i++) {
        const x = i * (this.spacingX + this._childWith) - width / 2 + this._childWith / 2 - i * stackLength;
        this.node.children[i].position = new Vec3(x, 0, 0);
      }
    } else {
      for (let i = 0; i < this._cardList.length; i++) {
        const x = i * (this.spacingX + this._childWith) - width / 2 + this._childWith / 2;
        this.node.children[i].position = new Vec3(x, 0, 0);
      }
    }
  }
}
