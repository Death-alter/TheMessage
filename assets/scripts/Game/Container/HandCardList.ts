import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "../../Game/Container/HandCardContianer";
import { Card } from "../Card/Card";
import { SelectedList } from "../../Utils/SelectedList";

export class HandCardList extends DataContainer<Card> {
  selectedCards: SelectedList<Card> = new SelectedList<Card>();

  constructor(gameObject?: HandCardContianer) {
    super(gameObject);
  }

  removeData(data: Card) {
    this.selectedCards.deselect(data);
    super.removeData(data);
  }

  removeAllData() {
    this.selectedCards.clear();
    super.removeAllData();
  }
}
