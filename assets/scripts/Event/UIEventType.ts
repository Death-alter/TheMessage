import { role } from "../../protobuf/proto.js";
import { CharacterType } from "../Components/Chatacter/type";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";

export interface StartSelectCharacter {
  playerCount: number;
  identity: IdentityType;
  secretTask: SecretTaskType;
  characterIdList: CharacterType[];
  waitingSecond: number;
  confirm?: (role: role) => void;
}

export interface StopSelectCharacter {}
