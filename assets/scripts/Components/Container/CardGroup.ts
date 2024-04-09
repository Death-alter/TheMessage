import { DataContainer } from "./DataContainer";
import { Card } from "../Card/Card";
import { CardGroupObject } from "./CardGroupObject";

export class CardGroup extends DataContainer<Card> {
  constructor(gameObject?: CardGroupObject) {
    super(gameObject);
  }
}
