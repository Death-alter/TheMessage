import { PlayerObject } from "./PlayerObject";
import { Character } from "../Chatacter/Character";
import { Identity } from "../Identity/Identity";

export interface PlayerOption {
  id: number;
  name: string;
  character: Character;
  identity?: Identity;
  gameObject?: PlayerObject;
}

export enum PlayerStatus {
  DEAD = 0,
  DYING = 1,
  ALIVE = 2,
}
