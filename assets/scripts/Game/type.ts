import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";

export enum GamePhase {
  DRAW_PHASE = 0, // 摸牌阶段
  MAIN_PHASE = 1, // 出牌阶段
  SEND_PHASE_START = 2, // 情报传递阶段开始时
  SEND_PHASE = 3, // 传递阶段
  FIGHT_PHASE = 4, // 争夺阶段
  RECEIVE_PHASE = 5, // 接收阶段
}

export interface PlayerOption {
  name: string;
  character: Character;
  identity?: Identity;
}
