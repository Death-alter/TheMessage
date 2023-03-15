import { CardObject } from "../../GameObject/Card/CardObject";
import { Card } from "../Cards/Card";
import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "../../GameObject/GameObjectContainer/HandCardContianer";

export class HandCardList extends DataContainer<Card, CardObject> {
  constructor(gameObject?: HandCardContianer) {
    super(gameObject);
  }
}
