import { CardObject } from "../../GameObject/Card/CardObject";
import { GameCard } from "../Cards/type";
import { DataContainer } from "./DataContainer";
import { CardGroupNode } from "../../GameObject/GameObjectContainer/CardGroupNode";

export class CardGroup extends DataContainer<GameCard, CardObject> {
  constructor(gameObject?: CardGroupNode) {
    super(gameObject);
  }
}
