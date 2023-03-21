import { Card } from "../Game/Card/Card";
import { GameCard } from "../Game/Card/type";
import { CharacterStatus } from "../Game/Character/type";
import { Player } from "../Game/Player/Player";
import { GamePhase } from "../GameManager/type";

export interface GameStart {
  playerList: Player[];
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
  cards: GameCard[];
}

export interface PlayerDiscardCard {
  cards: GameCard[];
}

export interface CharacterStatusChange {
  player: Player;
  status: CharacterStatus;
}
