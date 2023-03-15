import { PlayerObject } from "../../GameObject/Player/PlayerObject";
import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";

export interface PlayerOption {
  id: number;
  name: string;
  character: Character;
  identity?: Identity;
  gameObject?: PlayerObject;
}
