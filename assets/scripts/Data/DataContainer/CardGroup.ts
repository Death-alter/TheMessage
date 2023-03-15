import { CardObject } from "../../GameObject/Card/CardObject";
import { GameCard } from "../Cards/type";
import { DataContainer } from "./DataContainer";
import { CardGroupObject } from "../../GameObject/GameObjectContainer/CardGroupObject";

export class CardGroup extends DataContainer<GameCard, CardObject> {
  constructor(gameObject?: CardGroupObject) {
    super(gameObject);
  }
}
