import { CardType, CardDirection, CardColor, CardStatus, MiLingOption } from "./type";
import { CardDefaultOption, ShiTanOption } from "./type";
import { ChengQing } from "./CardClass/ChengQing";
import { ShiTan } from "./CardClass/ShiTan";
import { WeiBi } from "./CardClass/WeiBi";
import { LiYou } from "./CardClass/LiYou";
import { PingHeng } from "./CardClass/PingHeng";
import { PoYi } from "./CardClass/PoYi";
import { JieHuo } from "./CardClass/JieHuo";
import { DiaoBao } from "./CardClass/DiaoBao";
import { WuDao } from "./CardClass/WuDao";
import { FenYunBianHuan } from "./CardClass/FenYunBianHuan";
import { CardObject } from "../../Game/Card/CardObject";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
import { MiLing } from "./CardClass/MiLing";

interface createCardOption {
  id?: number;
  type: CardType;
  color?: CardColor[];
  direction?: CardDirection;
  drawCardColor?: CardColor[];
  secretColor?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  gameObject?: CardObject;
}

const cardsMap: { [index: number]: { new (option?: CardDefaultOption | ShiTanOption | MiLingOption): Card } } = {};

cardsMap[0] = ChengQing;
cardsMap[1] = ShiTan;
cardsMap[2] = WeiBi;
cardsMap[3] = LiYou;
cardsMap[4] = PingHeng;
cardsMap[5] = PoYi;
cardsMap[6] = JieHuo;
cardsMap[7] = DiaoBao;
cardsMap[8] = WuDao;
cardsMap[9] = FenYunBianHuan;
cardsMap[10] = MiLing;

export function createCard(option: createCardOption): Card {
  if (cardsMap[option.type]) {
    return new cardsMap[option.type](option);
  } else {
    return new UnknownCard(option);
  }
}

export function createUnknownCard(gameObject?): UnknownCard {
  return new UnknownCard({ gameObject });
}

export function copyCard(card: Card) {
  if (card instanceof UnknownCard) {
    return createUnknownCard();
  } else {
    const option: createCardOption = {
      id: card.id,
      type: card.type,
      color: card.color,
      direction: card.direction,
      lockable: card.lockable,
      status: card.status,
    };
    if (card instanceof ShiTan) {
      option.drawCardColor = card.drawCardColor;
    }
    if (card instanceof MiLing) {
      option.secretColor = card.secretColor;
    }
    return createCard(option);
  }
}
