import {
  _decorator,
  Component,
  Node,
  Label,
  color,
  Vec3,
  HorizontalTextAlignment,
  LabelOutline,
  Overflow,
  UITransform,
} from "cc";
import { Card } from "../../../Components/Card/Card";
import { CardGroupObject } from "../../../Components/Container/CardGroupObject";
import { DataContainer } from "../../../Components/Container/DataContainer";
import GamePools from "../../../Components/Pool/GamePools";
import { SelectedList } from "../../../Utils/SelectedList";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
const { ccclass, property } = _decorator;

export interface SelectCardsOptions {
  title?: string;
  limit: number;
  cardList?: () => Card[];
  tags?: string[];
}

@ccclass("SelectCardsWindow")
export class SelectCardsWindow extends Component {
  @property(Node)
  cardContainer: Node | null = null;
  @property(Node)
  title: Node | null = null;

  public cardList = new DataContainer<Card>();
  public selectedCards: SelectedList<Card> = new SelectedList<Card>();
  public isActive = true;

  onLoad() {
    this.cardContainer.addComponent(CardGroupObject);
    this.cardList.gameObject = this.cardContainer.getComponent(CardGroupObject);
  }

  show(options?: SelectCardsOptions) {
    if (!this.isActive) return;
    this.node.active = true;
    if (options) {
      const { title, cardList, limit, tags } = options;
      if (title) {
        this.setTitle(title);
      }
      if (cardList) {
        this.setCardList(cardList(), tags);
      }
      if (limit) {
        this.selectedCards.limit = limit;
      }
    }
  }

  hide() {
    this.node.active = false;
    this.selectedCards.limit = 0;
    this.selectedCards.clear();
    this.scheduleOnce(this.refresh, 0);
  }

  setTitle(text) {
    this.title.getComponentInChildren(Label).string = text;
  }

  setCardList(cardList: Card[], tags?: string[]) {
    this.cardList.removeAllData();
    cardList.forEach((card, index) => {
      this.addCard(card);
      if (tags) {
        this.addTag(card, tags[index]);
      }
    });
  }

  addCard(card: Card) {
    card.gameObject = GamePools.cardPool.get();
    card.gameObject.node.scale = new Vec3(1, 1, 1);
    card.gameObject.node.on(
      Node.EventType.TOUCH_END,
      (event) => {
        this.selectCard(card);
      },
      this
    );
    this.cardList.addData(card);
  }

  addTag(card: Card, tag: string) {
    const label = new Node();
    label.addComponent(Label);
    label.addComponent(LabelOutline);
    const labelComponent = label.getComponent(Label);
    labelComponent.color = color("#000000");
    labelComponent.string = tag;
    labelComponent.fontSize = 14;
    labelComponent.lineHeight = 16;
    labelComponent.horizontalAlign = HorizontalTextAlignment.CENTER;
    labelComponent.overflow = Overflow.RESIZE_HEIGHT;
    label.getComponent(UITransform).width = 100;
    card.gameObject.node.addChild(label);
    label.position = new Vec3(0, -50, 0);
    const outerline = label.getComponent(LabelOutline);
    outerline.color = color("#FFFFFF");
    outerline.width = 2;
  }

  removeCard(card: Card) {
    this.cardList.removeData(card);
    const gameObject = card.gameObject;
    gameObject.node.off(Node.EventType.TOUCH_END);
    card.gameObject = null;
    GamePools.cardPool.put(gameObject);
  }

  refresh() {
    for (let card of this.cardList.list) {
      if (this.selectedCards.isSelected(card)) {
        card.gameObject?.getComponentInChildren(OuterGlow).openOuterGlow();
      } else {
        card.gameObject?.getComponentInChildren(OuterGlow).closeOuterGlow();
      }
    }
  }

  selectCard(card: Card) {
    if (this.selectedCards.isSelected(card)) {
      this.selectedCards.deselect(card);
    } else {
      const flag = this.selectedCards.select(card);
      if (!flag) {
        const firstCard = this.selectedCards.list[0];
        this.selectedCards.deselect(firstCard);
        this.selectedCards.select(card);
      }
    }
    this.scheduleOnce(this.refresh, 0);
  }
}
