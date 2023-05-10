import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class LiYou extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      sprite: "images/cards/LiYou",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {}
  
  enabledToPlay(gameData: GameData): boolean {
    return true;
  }


  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }


  onPlay() {
    super.onPlay();
  }

  onEffect(gameData: GameData, { userId, targetPlayerId, targetCard, flag }: CardOnEffectParams): void {
    if (!targetCard) return;
    const card = gameData.createCard(targetCard);
    const targetPlayer = gameData.playerList[targetPlayerId];
    const user = gameData.playerList[userId];
    gameData.gameObject.cardAction.liYouShowCard(card).then(() => {
      if (flag) {
        targetPlayer.addHandCard(card);
        GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
          player: user,
          card: card,
        });
      } else {
        const card = gameData.createMessage(targetCard);
        targetPlayer.addMessage(card);
        GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
          player: targetPlayer,
          message: card,
        });
      }
    });
  }
}
