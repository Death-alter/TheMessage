import { Node } from "cc";
import { Player } from "../Game/Player/Player";

export const enum GamePhase {
  DRAW_PHASE = 0, // 摸牌阶段
  MAIN_PHASE = 1, // 出牌阶段
  SEND_PHASE_START = 2, // 情报传递阶段开始时
  SEND_PHASE = 3, // 传递阶段
  FIGHT_PHASE = 4, // 争夺阶段
  RECEIVE_PHASE = 5, // 接收阶段
}

export const enum CardActionLocation {
  CENTER = 0,
  DECK = 1,
  DISCARD_PILE = 2,
  PLAYER = 3,
  PLAYER_HAND_CARD = 4,
  PLAYER_MESSAGE_ZONE = 5,
}

export interface ActionLocation {
  location: CardActionLocation;
  player?: Player;
}

export interface MoveNodeParams {
  node: Node;
  from?: ActionLocation;
  to: ActionLocation;
  duration?: number;
}

export const enum WaitingType {
  UNKNOWN = 0,
  PLAY_CARD = 1,
  HNADLER_CARD = 2,
  GIVE_CARD = 3,
  PLAYER_DYING = 4,
  USE_SKILL = 5,
  HNADLER_SKILL = 6,
  SEND_MESSAGE = 7,
  RECEIVE_MESSAGE = 8,
}

export interface ButtonConfig {
  text: string;
  onclick: () => void;
  disabled?: boolean;
}
