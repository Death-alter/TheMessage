import { direction, card_type, color } from "../../Protobuf/proto";

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

export interface CardOption {
  id: number;
  name: string;
  type: card_type;
  spirit: string;
  status?: CardStatus;
  useage?: CardUseage;
  direction: direction;
}

export interface CardClassDefaultOption {
  id: number;
  direction: direction;
}

export interface ShiTanOption {
  id: number;
  direction: direction;
  drawCardColor: color[];
}
