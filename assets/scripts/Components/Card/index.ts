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
import { FengYunBianHuan } from "./CardClass/FengYunBianHuan";
import { UnknownCard } from "./CardClass/UnknownCard";
import { Card } from "./Card";
import { MiLing } from "./CardClass/MiLing";
import { IdentityType } from "../Identity/type";
import { CardEntity } from "./CardEntity";
import { Sex } from "../Character/type";
import { DiaoHuLiShan } from "./CardClass/DiaoHuLiShan";
import { YuQinGuZong } from "./CardClass/YuQinGuZong";

interface createCardOption {
  id?: number;
  type: CardType;
  color?: CardColor[];
  direction?: CardDirection;
  drawCardColor?: IdentityType[];
  secretColor?: CardColor[];
  lockable?: boolean;
  status?: CardStatus;
  entity?: CardEntity;
}

const cardsMap: { [index: number]: { new (option?: CardDefaultOption | ShiTanOption | MiLingOption): Card } } = {};
const cardsAudioMap: { [index: number]: string } = {};

cardsMap[CardType.CHENG_QING] = ChengQing;
cardsMap[CardType.SHI_TAN] = ShiTan;
cardsMap[CardType.WEI_BI] = WeiBi;
cardsMap[CardType.LI_YOU] = LiYou;
cardsMap[CardType.PING_HENG] = PingHeng;
cardsMap[CardType.PO_YI] = PoYi;
cardsMap[CardType.JIE_HUO] = JieHuo;
cardsMap[CardType.DIAO_BAO] = DiaoBao;
cardsMap[CardType.WU_DAO] = WuDao;
cardsMap[CardType.FENG_YUN_BIAN_HUAN] = FengYunBianHuan;
cardsMap[CardType.MI_LING] = MiLing;
cardsMap[CardType.DIAO_HU_LI_SHAN] = DiaoHuLiShan;
cardsMap[CardType.YU_QIN_GU_ZONG] = YuQinGuZong;

cardsAudioMap[CardType.UNKNOWN] = "CardBack";
cardsAudioMap[CardType.CHENG_QING] = "ChengQing";
cardsAudioMap[CardType.SHI_TAN] = "ShiTan";
cardsAudioMap[CardType.WEI_BI] = "WeiBi";
cardsAudioMap[CardType.LI_YOU] = "LiYou";
cardsAudioMap[CardType.PING_HENG] = "PingHeng";
cardsAudioMap[CardType.PO_YI] = "PoYi";
cardsAudioMap[CardType.JIE_HUO] = "JieHuo";
cardsAudioMap[CardType.DIAO_BAO] = "DiaoBao";
cardsAudioMap[CardType.WU_DAO] = "WuDao";
cardsAudioMap[CardType.FENG_YUN_BIAN_HUAN] = "FengYunBianHuan";
cardsAudioMap[CardType.MI_LING] = "MiLing";
cardsAudioMap[CardType.DIAO_HU_LI_SHAN] = "DiaoHuLiShan";
cardsAudioMap[CardType.YU_QIN_GU_ZONG] = "YuQinGuZong";

export function createCard(option: createCardOption): Card {
  if (cardsMap[option.type]) {
    return new cardsMap[option.type](option);
  } else {
    return new UnknownCard(option);
  }
}

export function createUnknownCard(entity?): UnknownCard {
  return new UnknownCard({ entity });
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

export function getCardTypeCount() {
  Object.keys(cardsMap).length;
}

export function getCardTypeText(type: CardType) {
  return cardsAudioMap[type];
}

export function getCardAudioSrc(param: Card | CardType, sex: Sex) {
  const sexText = sex === Sex.FEMALE ? "woman" : "man";

  if (param instanceof Card) {
    return `audio/cards/${cardsAudioMap[param.type]}_${sexText}`;
  } else {
    return `audio/cards/${cardsAudioMap[param]}_${sexText}`;
  }
}
