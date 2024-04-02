import { card } from "../../protobuf/proto";
import { Card } from "../Components/Card/Card";
import { CardDirection, CardType, CardOnEffectParams } from "../Components/Card/type";
import { IdentityType, SecretTaskType } from "../Components/Identity/type";
import { GamePhase, WaitingType } from "../Manager/type";

export interface UpdateCharacterStatus {
  playerId: number;
  characterId: number;
}

export interface SyncPhaseData {
  currentPlayerId: number;
  currentPhase: GamePhase;
  messagePlayerId: number;
  messageDirection: CardDirection;
  messageInTransmit: card;
  senderId: number;
  needWaiting: boolean;
}

export interface SyncDeckNum {
  number: number;
  shuffled: boolean;
}

export interface DrawCards {
  playerId: number;
  cards: card[];
  unknownCardCount: number;
}

export interface DiscardCards {
  playerId: number;
  cards: card[];
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
  card?: card | Card;
  senderId: number;
  targetPlayerId: number;
  lockPlayerIds: number[];
  direction: CardDirection;
  fromHand: boolean;
}

export interface ChooseReceive {
  playerId: number;
}

export interface PlayerDying {
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
    addScore: number;
    score: number;
    rank: string;
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
export interface GmAddMessage {
  targetPlayerId: number;
  messageCards: card[];
}
