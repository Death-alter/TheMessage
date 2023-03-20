import { card } from "../../protobuf/proto";
import { CharacterType } from "../Game/Character/type";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";

export interface NetworkError {
  code?: number;
  msg: string;
}

export interface RecordStatusChange {
  paused: boolean;
}

export interface GetRecordList {
  records: string[];
}

export interface GetOrders {}

export interface UpdateOnlineCount {
  onlineCount: number;
}

export interface RemoveRoomPosition {
  position: number;
}

export interface SaveRecordSuccess {
  recordId: string;
}

export interface CreateRoom {
  myPosition: number;
  onlineCount: number;
  players: {
    id: number;
    name: string;
    winCount: number;
  };
}

export interface JoinRoom {
  name: string;
  position: number;
  winCount: number;
  gameCount: number;
}

export interface LeaveRoom {
  position: number;
}

export interface StartSelectCharacter {
  playerCount: number;
  identity: IdentityType;
  secretTask: SecretTaskType;
  characterIdList: CharacterType[];
  waitingSecond: number;
}

export interface GetAutoPlayStatus {
  enable: boolean;
}

export interface ConfirmSelectCharacter {
  characterId: CharacterType;
}

export interface InitGame {
  playerCount: number;
  identity: IdentityType;
  secretTask: SecretTaskType;
  players: {
    id: number;
    name: string;
    characterId: CharacterType;
  };
}

export interface UpdateCharacterStatus {
  playerId: number;
  characterId: CharacterType;
}

export interface DrawCards {
  playerId: number;
  cards: card[];
  unknownCardCount: number;
}

export interface SyncDeckNum {
  number: number;
  shuffled: boolean;
}

export interface DiscardCards {
  playerId: number;
  cards: card[];
}
