import { role } from "../../protobuf/proto.js";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";

export interface StartSelectCharacter {
  playerCount: number;
  identity: IdentityType;
  secretTask: SecretTaskType;
  secretTaskList: SecretTaskType[];
  characterIdList: number[];
  waitingSecond: number;
  confirm?: (role: role) => void;
}

export interface StopSelectCharacter {}
