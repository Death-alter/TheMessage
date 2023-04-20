import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "../../Game/Container/HandCardContianer";
import { Card } from "../Card/Card";

export class HandCardList extends DataContainer<Card> {
  constructor(gameObject?: HandCardContianer) {
    super(gameObject);
  }
}
