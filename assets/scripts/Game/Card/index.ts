import { UnknownCard } from "./Card";
import { GameCard, CardType, CardDirection, CardColor, CardStatus, CardUsage } from "./type";
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

interface createCardOption {
  id?: number;
  type: CardType;
  color?: CardColor[];
  direction?: CardDirection;
  drawCardColor?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  usage?: CardUsage;
  gameObject?: CardObject;
}

const cardsMap: { [index: number]: { new (option?: CardDefaultOption | ShiTanOption): GameCard } } = {};

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

export function createCard(option: createCardOption): GameCard {
  if (cardsMap[option.type]) {
    return new cardsMap[option.type](option);
  } else {
    return new UnknownCard(option.gameObject);
  }
}

export function createUnknownCard(gameObject?): UnknownCard {
  return new UnknownCard(gameObject);
}
