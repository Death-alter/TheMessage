import { Card } from "../Game/Card/Card";
import { CardDirection } from "../Game/Card/type";
import { CharacterStatus } from "../Game/Character/type";
import { Identity } from "../Game/Identity/Identity";
import { Player } from "../Game/Player/Player";
import { GamePhase } from "../GameManager/type";

export interface GameInit {
  playerList: Player[];
}

export interface GameStart {
  firstPlayerId: number;
}

export interface DeckCardNumberChange {
  number: number;
}

export interface GamePhaseChange {
  phase: GamePhase;
  turnPlayer: Player;
}

export interface GameTurnChange {
  turnPlayer: Player;
}

export interface MessageTransmission {
  message: Card;
  messagePlayer: Player;
}

export interface MessageReplaced {
  message: Card;
  oldMessage: Card;
}

export interface MessagePlacedIntoMessageZone {
  player: Player;
  message: Card;
}

export interface CardAddToHandCard {
  player: Player;
  card: Card;
}

export interface PlayerDrawCard {
  player: Player;
  cardList:Card[];
}

export interface PlayerDiscardCard {
  player: Player;
  cardList: Card[];
}

export interface CharacterStatusChange {
  player: Player;
  status: CharacterStatus;
}

export interface PlayerSendMessage {
  player: Player;
  message: Card;
  targetPlayer: Player;
  direction: CardDirection;
}

export interface PlayerChooseReceiveMessage {
  player: Player;
  message: Card;
}

export interface PlayerReceiveMessage {
  player: Player;
  message: Card;
}

export interface PlayerRemoveMessage {
  player: Player;
  messageList: Card[];
}

export interface PlayerDying {
  player: Player;
}

export interface PlayerBeforeDeath {
  player: Player;
  loseGame: boolean;
}

export interface PlayerGiveCard {
  player: Player;
  targetPlayer: Player;
  cardList: Card[];
}

export interface PlayerDie {
  player: Player;
  handCards: Card[];
  messages: Card[];
}

export interface PlayerGetCardsFromOthers {
  player: Player;
  fromPlayer: Player;
  cardList: Card[];
}

export interface GameOver {
  players: {
    player: Player;
    identity: Identity;
    isWinner: boolean;
    isDeclarer: boolean;
  }[];
}

export interface PlayerPalyCard {
  player: Player;
  targetPlayer?: Player;
  card: Card;
}

export interface AfterPlayerPalyCard {
  card: Card;
  flag: boolean;
}
