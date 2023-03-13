import { CardUI } from "../../UI/Game/Card/CardUI";
import { Card } from "../Cards/Card";
import { DataContainer } from "./DataContainer";
import { HandCardUI } from "../../UI/Game/UIContainer/HandCardUI";

export class HandCardList extends DataContainer<Card, CardUI> {
  protected _UI: HandCardUI;

  constructor(UI: HandCardUI) {
    super(UI);
  }

  addData(card: Card) {
    super.addData(card);
    this._UI.addCard(card);
  }

  removeData(card: Card) {
    super.removeData(card);
    this._UI.removeCard(card);
  }

  removeAllData() {
    this._list = [];
    this._UI.node.removeAllChildren();
  }

  bindUI(UI: any): void {
    super.bindUI(UI);
    this._UI.init();
  }
}
