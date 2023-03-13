import { PlayerUI } from "../../UI/Game/Player/PlayerUI";
import { Character } from "../Characters/Character";
import { Identity } from "../Identity/Identity";

export interface PlayerOption {
  id: number;
  name: string;
  character: Character;
  identity?: Identity;
  UI?: PlayerUI;
}
