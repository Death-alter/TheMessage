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
import { CardGroupEntity } from "../../../Components/Container/CardGroupEntity";
import { DataContainer } from "../../../Components/Container/DataContainer";
import GamePools from "../../../Components/Pool/GamePools";
import DynamicButtons, { ButtonConfig } from "../../../Components/Utils/DynamicButtons";
import { SelectedList } from "../../../Utils/SelectedList";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
const { ccclass, property } = _decorator;

export interface ShowCardsOptions {
  title?: string;
  limit: number;
  cardList?: Card[];
  buttons?: ButtonConfig[];
  tags?: string[];
}

@ccclass("ShowCardsWindow")
export class ShowCardsWindow extends Component {
  @property(Node)
  cardContainer: Node | null = null;
  @property(Node)
  buttonNode: Node | null = null;
  @property(Node)
  title: Node | null = null;

  public cardList = new DataContainer<Card>();
  public selectedCards: SelectedList<Card> = new SelectedList<Card>();
  public buttons: DynamicButtons;
  public isActive = true;

  onLoad() {
    this.cardContainer.addComponent(CardGroupEntity);
    this.cardList.entity = this.cardContainer.getComponent(CardGroupEntity);
    this.buttons = this.buttonNode.getComponent(DynamicButtons);
    this.buttons.init(this);
  }

  show(options?: ShowCardsOptions) {
    if (!this.isActive) return;
    this.node.active = true;
    if (options) {
      const { title, cardList, buttons, limit, tags } = options;
      if (title) {
        this.setTitle(title);
      }
      if (cardList) {
        this.setCardList(cardList, tags);
      }
      if (buttons) {
        this.buttons.setButtons(buttons);
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
    card.entity = GamePools.cardPool.get();
    card.entity.node.scale = new Vec3(1, 1, 1);
    card.entity.node.on(
      Node.EventType.TOUCH_END,
      (event) => {
        this.selectCard(card);
      },
      this,
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
    card.entity.node.addChild(label);
    label.position = new Vec3(0, -50, 0);
    const outerline = label.getComponent(LabelOutline);
    outerline.color = color("#FFFFFF");
    outerline.width = 2;
  }

  removeCard(card: Card) {
    this.cardList.removeData(card);
    const entity = card.entity;
    entity.node.off(Node.EventType.TOUCH_END);
    card.entity = null;
    GamePools.cardPool.put(entity);
  }

  refresh() {
    for (const card of this.cardList.list) {
      if (this.selectedCards.isSelected(card)) {
        card.entity?.getComponentInChildren(OuterGlow).openOuterGlow();
      } else {
        card.entity?.getComponentInChildren(OuterGlow).closeOuterGlow();
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
