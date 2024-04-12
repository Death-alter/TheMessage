import { Node, Vec3 } from "cc";
import { Player } from "../Components/Player/Player";
import { AnimationAction } from "../Scenes/Game/AnimationLayer/KeyframeAnimation";

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
  location?: CardActionLocation;
  player?: Player;
  position?: Vec3;
}

export interface MoveNodeParams {
  node: Node;
  from?: ActionLocation;
  to: ActionLocation;
  duration?: number;
  action?: AnimationAction;
  queueName?: string;
}

export const enum WaitingType {
  UNKNOWN = 0,
  PLAY_CARD = 1,
  HANDLE_CARD = 2,
  GIVE_CARD = 3,
  PLAYER_DYING = 4,
  USE_SKILL = 5,
  HANDLE_SKILL = 6,
  SEND_MESSAGE = 7,
  RECEIVE_MESSAGE = 8,
}

export const enum SyncStatus {
  NO_SYNC = 0,
  IS_SYNCING = 1,
  SYNC_COMPLETE = 2,
}
