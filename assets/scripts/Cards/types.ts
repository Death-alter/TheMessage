export enum CardStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
}

export enum CardUseage {
  UNKONWN = 0,
  FUNCTION_CARD = 1,
  MESSAGE_CARD = 2,
  HAND_CARD = 3,
}

export enum CardType {
  CHENG_QING = 0, // 澄清
  SHI_TAN = 1, // 试探
  WEI_BI = 2, // 威逼
  LI_YOU = 3, // 利诱
  PING_HENG = 4, // 平衡
  PO_YI = 5, // 破译
  JIE_HUO = 6, // 截获
  DIAO_BAO = 7, // 调包
  WU_DAO = 8, // 误导
  FENG_YUN_BIAN_HUAN = 9, // 风云变幻
}

export enum CardColor {
  BLACK = 0,
  RED = 1,
  BLUE = 2,
}

export enum CardDirection {
  UP = 0,
  LEFT = 1,
  RIGHT = 2,
}

export interface CardOption {
  id: number;
  name: string;
  type: CardType;
  spirit: string;
  status?: CardStatus;
  useage?: CardUseage;
  direction: CardDirection;
}

export interface CardClassDefaultOption {
  id: number;
  direction: CardDirection;
}

export interface ShiTanOption {
  id: number;
  direction: CardDirection;
  drawCardColor: CardColor[];
}
