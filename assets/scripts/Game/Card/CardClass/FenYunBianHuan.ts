import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType, CardUsage } from "../type";

export class FenYunBianHuan extends Card {
  public showCardList: Card[] = [];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: CardType.FENG_YUN_BIAN_HUAN,
      sprite: "images/cards/FengYunBianHuan",
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

  onShowCards(gameData: GameData, { cards }: CardOnEffectParams) {
    for (let card of cards) {
      this.showCardList.push(gameData.createCard(card, CardUsage.UNKNOWN, CardStatus.FACE_UP));
    }
    console.log(this.showCardList);
  }

  onChooseCard(gameData: GameData, { playerId, cardId, asMessageCard }: CardOnEffectParams) {
    const player = gameData.playerList[playerId];
    for (let card of this.showCardList) {
      console.log(card);
      if (card.id === cardId) {
        if (asMessageCard) {
          player.addMessage(card);
          GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
            player,
            message: card,
          });
        } else {
          player.addHandCard(card);
          GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
            player,
            card,
          });
        }
        break;
      }
    }
  }
}
