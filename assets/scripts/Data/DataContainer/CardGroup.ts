import { CardUI } from "../../UI/Game/Card/CardUI";
import { GameCard } from "../Cards/type";
import { DataContainer } from "./DataContainer";
import { CardGroupNode } from "../../UI/Game/UIContainer/CardGroupNode";

export class CardGroup extends DataContainer<GameCard, CardUI> {
  constructor(UI?: CardGroupNode) {
    super(UI);
  }
}
