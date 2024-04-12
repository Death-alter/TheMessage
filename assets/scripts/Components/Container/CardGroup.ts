import { DataContainer } from "./DataContainer";
import { Card } from "../Card/Card";
import { CardGroupEntity } from "./CardGroupEntity";

export class CardGroup extends DataContainer<Card> {
  constructor(entity?: CardGroupEntity) {
    super(entity);
  }
}
