import { Card } from "../Components/Card/Card";
import { CardColor } from "../Components/Card/type";

export { BrowserDetection } from "./BrowserDetection";

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
  for (const item of arr) {
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
