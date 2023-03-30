import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class WeiBi extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      sprite: "images/cards/WeiBi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onPlay() {
    super.onPlay();
  }

  onEffect(gameData: GameData, params: CardOnEffectParams) {}

  onGiveCard(gameData: GameData, { user, targetPlayer, card }: CardOnEffectParams) {
    console.log(card, targetPlayer);
    let removedCard;
    if (card) {
      removedCard = targetPlayer.removeHandCard(card.id)[0];
    }
    if (!removedCard) {
      removedCard = targetPlayer.removeHandCard(0)[0];
    }
    console.log(removedCard);
    user.addHandCard(removedCard);
  }

  onShowHandCard(gameData: GameData, params: CardOnEffectParams) {}
}
