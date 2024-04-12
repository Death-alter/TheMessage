import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "./HandCardContianer";
import { Card } from "../Card/Card";
import { SelectedList } from "../../Utils/SelectedList";

export class HandCardList extends DataContainer<Card> {
  selectedCards: SelectedList<Card> = new SelectedList<Card>();

  constructor(entity?: HandCardContianer) {
    super(entity);
  }

  removeData(card: Card): Card;
  removeData(cardId: number): Card;
  removeData(data: Card | number): Card {
    let index = -1;
    if (!(data instanceof Card)) {
      for (let i = 0; i < this._list.length; i++) {
        if (this._list[i].id === data) {
          index = i;
          break;
        }
      }
    } else {
      index = this._list.indexOf(data);
    }
    if (index === -1) return;

    const card = this._list.splice(index, 1)[0];
    this.selectedCards.deselect(card);

    if (this.entity && card.entity) {
      this.entity.node.removeChild(card.entity.node);
      this.entity.onDataRemoved(card);
    }
    return card;
  }

  removeAllData() {
    this.selectedCards.clear();
    super.removeAllData();
  }
}
