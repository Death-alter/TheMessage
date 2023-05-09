import { _decorator, Component, Node, Label, Prefab, Button, instantiate, NodePool } from "cc";
import { Card } from "../../../Game/Card/Card";
import { CardGroupObject } from "../../../Game/Container/CardGroupObject";
import { DataContainer } from "../../../Game/Container/DataContainer";
import { ButtonConfig } from "../../../GameManager/type";
import GamePools from "../../../GameManager/GamePools";
import { SelectedList } from "../../../Utils/SelectedList";
const { ccclass, property } = _decorator;

@ccclass("ShowCardsWindow")
export class ShowCardsWindow extends Component {
  @property(Node)
  cardContainer: Node | null = null;
  @property(Node)
  buttons: Node | null = null;
  @property(Prefab)
  buttonPrefab: Prefab | null = null;

  private title: Node | null = null;
  private buttonPool: NodePool;
  private cardList = new DataContainer<Card>();
  public selectedCards: SelectedList<Card> = new SelectedList<Card>();

  onLoad() {
    this.title = this.node.getChildByPath("Title/Label");
    this.cardContainer.addComponent(CardGroupObject);
    this.cardList.gameObject = this.cardContainer.getComponent(CardGroupObject);
  }

  init(buttonPool) {
    this.buttonPool = buttonPool;
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
      this.setButtons(buttons);
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
    this.title.getComponent(Label).string = text;
  }

  setButtons(buttons: ButtonConfig[]) {
    this.buttons.removeAllChildren();
    const l = buttons.length - this.buttons.children.length;
    if (l >= 0) {
      for (let i = 0; i < l; i++) {
        let button = this.buttonPool.get();
        if (!button) {
          button = instantiate(this.buttonPrefab);
        }
        this.buttons.addChild(button);
      }
    } else {
      for (let i = buttons.length; i < this.buttons.children.length; i++) {
        this.buttonPool.put(this.buttons.children[i]);
      }
    }
    for (let i = 0; i < buttons.length; i++) {
      const button = this.buttons.children[i];
      const config = buttons[i];
      button.getChildByName("Label").getComponent(Label).string = config.text;
      button.off(Node.EventType.TOUCH_END);
      button.on(Node.EventType.TOUCH_END, config.onclick, button);
      button.getComponent(Button).interactable = !buttons[i].disabled;
    }
    return this.buttons.children;
  }

  selectCard(card) {
    if (this.selectedCards.isSelected(card)) {
      this.selectedCards.deselect(card);
    } else {
      this.selectedCards.select(card);
    }
  }
}
