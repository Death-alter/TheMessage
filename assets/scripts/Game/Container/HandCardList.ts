import { GameCard } from "../Card/type";
import { DataContainer } from "./DataContainer";
import { HandCardContianer } from "../../Game/Container/HandCardContianer";

export class HandCardList extends DataContainer<GameCard> {
  constructor(gameObject?: HandCardContianer) {
    super(gameObject);
  }
}
