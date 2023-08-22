import { card } from "../../protobuf/proto";
import { CardDirection, CardType, CardOnEffectParams } from "../Components/Card/type";
import { CharacterType } from "../Components/Chatacter/type";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";
import { GamePhase, WaitingType } from "../Manager/type";

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
  notice: string;
  players: {
    id: number;
    name: string;
    winCount: number;
    gameCount: number;
    rank: string;
    score: number;
  }[];
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

export interface GetPhaseData {
  currentPlayerId: number;
  currentPhase: GamePhase;
  messagePlayerId: number;
  messageDirection: CardDirection;
  messageInTransmit: card;
  senderId: number;
  needWaiting: boolean;
}

export interface StartCountDown {
  playerId: number;
  second: number;
  type: WaitingType;
  isMultiply?: boolean;
  params?: { [index: string]: any };
  seq: number;
}

export interface SendMessage {
  cardId?: number;
  card?: card;
  senderId: number;
  targetPlayerId: number;
  lockPlayerIds: number[];
  direction: CardDirection;
}

export interface ChooseReceive {
  playerId: number;
}

export interface PlayerBeforeDeath {
  playerId: number;
  loseGame: boolean;
}

export interface PlayerDie {
  playerId: number;
}

export interface PlayerWin {
  players: {
    playerId: number;
    identity: IdentityType;
    secretTask: SecretTaskType;
    isWinner: boolean;
    isDeclarer: boolean;
  }[];
}

export interface PlayerDieGiveCard {
  playerId: number;
  targetPlayerId: number;
  cards: card[];
  unknownCardCount: number;
}

export interface CardPlayed {
  userId: number;
  cardType: CardType;
  cardId?: number;
  card?: card;
  isActual: boolean;
  targetPlayerId?: number;
  [index: string]: any;
}

export interface CardInProcess {
  handler?: string;
  data: CardOnEffectParams;
}

export interface PlayerNetworkStatusChange {
  playerId: number;
  isAuto: boolean;
  isOffline: boolean;
}
