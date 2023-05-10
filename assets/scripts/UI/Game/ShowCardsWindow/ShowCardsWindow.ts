import { _decorator, Component, Node, Label } from "cc";
import { Card } from "../../../Game/Card/Card";
import { CardGroupObject } from "../../../Game/Container/CardGroupObject";
import { DataContainer } from "../../../Game/Container/DataContainer";
import GamePools from "../../../GameManager/GamePools";
import DynamicButtons, { ButtonConfig } from "../../../Utils/DynamicButtons";
import { SelectedList } from "../../../Utils/SelectedList";
const { ccclass, property } = _decorator;

@ccclass("ShowCardsWindow")
export class ShowCardsWindow extends Component {
  @property(Node)
  cardContainer: Node | null = null;
  @property(Node)
  buttonNode: Node | null = null;
  @property(Node)
  title: Node | null = null;

  private cardList = new DataContainer<Card>();
  public selectedCards: SelectedList<Card> = new SelectedList<Card>();
  public buttons: DynamicButtons;

  onLoad() {
    this.cardContainer.addComponent(CardGroupObject);
    this.cardList.gameObject = this.cardContainer.getComponent(CardGroupObject);
    this.buttons = this.buttonNode.getComponent(DynamicButtons);
    this.node.active = false;
  }

  show(options: { title?: string; cardList?: Card[]; buttons?: ButtonConfig[]; limit: number }) {
    const { title, cardList, buttons, limit } = options;
    if (title) {
      this.setTitle(title);
    }
    if (cardList && cardList.length) {
      this.cardList.removeAllData();
      for (let card of cardList) {
        card.gameObject = GamePools.cardPool.get();
        card.gameObject.node.on(
          Node.EventType.TOUCH_END,
          (event) => {
            this.selectCard(card);
          },
          this
        );
        this.cardList.addData(card);
      }
    }
    if (buttons) {
      this.buttons.setButtons(buttons);
    }
    if (limit) {
      this.selectedCards.limit = limit;
    }
    this.node.active = true;
  }

  hide() {
    this.node.active = false;
  }

  setTitle(text) {
    this.title.getComponentInChildren(Label).string = text;
  }

  selectCard(card) {
    if (this.selectedCards.isSelected(card)) {
      this.selectedCards.deselect(card);
    } else {
      this.selectedCards.select(card);
    }
  }
}
