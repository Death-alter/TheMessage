import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor, CardOnEffectParams, CardStatus, CardDirection } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class ShiTan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];
  private _drawCardColor: CardColor[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      sprite: "images/cards/ShiTan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {}
  
  enabledToPlay(gameData: GameData): boolean {
    return true;
  }


  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }


  onPlay() {
  }

  onEffect(gameData: GameData, { userId, flag }: CardOnEffectParams) {}

  onShow(gameData: GameData, { userId, targetPlayerId, card }: CardOnEffectParams) {
    //自己是被试探的目标时展示那张试探牌
    if (targetPlayerId === 0) {
      const shiTanCard = gameData.createCard(card);
      shiTanCard.gameObject = gameData.cardOnPlay.gameObject;
      gameData.cardOnPlay = shiTanCard;
    }
  }
}
