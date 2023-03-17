import { CardObject } from "../../Game/Card/CardObject";
import { Card } from "../Card/Card";
import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "../../Game/Container/HandCardContianer";

export class HandCardList extends DataContainer<Card, CardObject> {
  constructor(gameObject?: HandCardContianer) {
    super(gameObject);
  }
}
