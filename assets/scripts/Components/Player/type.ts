import { PlayerEntity } from "./PlayerEntity";
import { Character } from "../Character/Character";
import { Identity } from "../Identity/Identity";

export interface PlayerOption {
  id: number;
  name: string;
  character: Character;
  identity?: Identity;
  entity?: PlayerEntity;
}

export enum PlayerStatus {
  DEAD = 0,
  DYING = 1,
  ALIVE = 2,
}
