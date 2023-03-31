import { Card } from "../Game/Card/Card";
import { GameCard } from "../Game/Card/type";
import { CharacterStatus } from "../Game/Character/type";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
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
}

export interface PlayerChooseReceiveMessage {
  player: Player;
  message: GameCard;
}

export interface PlayerReceiveMessage {
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
    playerId: Player;
    identity: IdentityType;
    secretTask: SecretTaskType;
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
}
