import { Card } from "../Game/Card/Card";
import { CardColor } from "../Game/Card/type";

export function getCardColorText(card: Card);
export function getCardColorText(color: CardColor);
export function getCardColorText(c: Card | CardColor) {
  let arr;
  if (c instanceof Card) {
    arr = c.color;
  } else {
    arr = [c];
  }

  let str = "";
  for (let item of arr) {
    switch (item) {
      case CardColor.BLACK:
        str += "黑";
        break;
      case CardColor.BLUE:
        str += "蓝";
        break;
      case CardColor.RED:
        str += "红";
        break;
    }
  }
  return str
}
