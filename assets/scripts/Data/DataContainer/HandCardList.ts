import { CardUI } from "../../UI/Game/Card/CardUI";
import { Card } from "../Cards/Card";
import { DataContainer } from "./DataContainer";
import { HandCardUI } from "../../UI/Game/UIContainer/HandCardUI";

export class HandCardList extends DataContainer<Card, CardUI> {

  constructor(UI?: HandCardUI) {
    super(UI);
  }
}
