import { PlayerObject } from "../../Game/Player/PlayerObject";
import { Character } from "../Character/Character";
import { Identity } from "../Identity/Identity";

export interface PlayerOption {
  id: number;
  name: string;
  character: Character;
  identity?: Identity;
  gameObject?: PlayerObject;
}
