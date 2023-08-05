import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class JieHuo extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      src: "JieHuo",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameManager): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用截获？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.USE_JIE_HUO_TOS, {
            cardId: this.id,
            seq: gui.seq,
          });
        },
        enabled: () => gui.data.messagePlayerId !== 0,
      },
    ]);
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
