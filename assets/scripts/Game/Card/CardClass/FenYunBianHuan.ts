import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { CardActionLocation, GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";

export class FenYunBianHuan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];
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
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    tooltip.setText(`是否使用风云变幻？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const card = gameData.gameObject.handCardList.selectedCards.list[0];
          NetworkEventCenter.emit(NetworkEventToS.USE_FENG_YUN_BIAN_HUAN_TOS, {
            cardId: card.id,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onDeselected() {}

  onEffect(gameData: GameData, params: CardOnEffectParams) {}

  onShowCards(gameData: GameData, { cards }: CardOnEffectParams) {
    for (let card of cards) {
      this.showCardList.push(gameData.createCard(card, CardStatus.FACE_UP));
    }
    console.log(this.showCardList);
  }

  onChooseCard(gameData: GameData, { playerId, cardId, asMessageCard }: CardOnEffectParams) {
    const player = gameData.playerList[playerId];
    for (let card of this.showCardList) {
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
            from: CardActionLocation.DECK,
          });
        }
        break;
      }
    }
  }
}
