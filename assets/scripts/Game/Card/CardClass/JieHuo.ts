import { ProcessEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { ProcessEvent, NetworkEventToS } from "../../../Event/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Player } from "../../Player/Player";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class JieHuo extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      sprite: "images/cards/JieHuo",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    tooltip.setText(`是否使用截获？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const card = gameData.gameObject.handCardList.selectedCards.list[0];
          NetworkEventCenter.emit(NetworkEventToS.USE_JIE_HUO_TOS, {
            cardId: card.id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => gameData.messagePlayerId !== 0,
      },
    ]);
  }

  onDeselected(gameData: GameData, tooltip: Tooltip): void {}

  onPlay() {
    super.onPlay();
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
