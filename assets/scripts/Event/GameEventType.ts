import { Card } from "../Game/Card/Card";
import { CardDirection, GameCard } from "../Game/Card/type";
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

export interface PlayerDrawCard {
  player: Player;
  cardList: GameCard[];
}

export interface PlayerDiscardCard {
  player: Player;
  cardList: GameCard[];
}

export interface CharacterStatusChange {
  player: Player;
  status: CharacterStatus;
}

export interface PlayerSendMessage {
  player: Player;
  message: GameCard;
  targetPlayer: Player;
  direction: CardDirection;
}

export interface PlayerChooseReceiveMessage {
  player: Player;
  message: GameCard;
}

export interface PlayerReceiveMessage {
  player: Player;
  message: Card;
}

export interface PlayerRemoveMessage {
  player: Player;
  message: Card;
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
  cardList: GameCard[];
}

export interface PlayerDie {
  player: Player;
  handCards: GameCard[];
  messages: Card[];
}

export interface PlayerGetCardsFromOthers {
  player: Player;
  fromPlayer: Player;
  cardList: GameCard[];
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
  card: GameCard;
}

export interface AfterPlayerPalyCard {
  card: GameCard;
  flag: boolean;
}
