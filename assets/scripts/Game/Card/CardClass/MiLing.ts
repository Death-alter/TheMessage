import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardType, MiLingOption } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class MiLing extends Card {
  public readonly availablePhases = [GamePhase.SEND_PHASE_START];
  private _secretColor: CardColor[];

  get secretColor() {
    return this._secretColor;
  }

  constructor(option: MiLingOption) {
    super({
      id: option.id,
      name: "密令",
      type: CardType.MI_LING,
      sprite: "images/cards/MiLing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._secretColor = option.secretColor;
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    gameData.gameObject.selectedPlayers.limit = 1;
    tooltip.setText(`请选择密令的目标`);
    ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, () => {
      tooltip.setText(`请选择一个暗号`);
      tooltip.buttons.setButtons([
        {
          text: "东风",
          onclick: () => {
            this.secretButtonClicked(gameData, tooltip, 0);
          },
        },
        {
          text: "西风",
          onclick: () => {
            this.secretButtonClicked(gameData, tooltip, 1);
          },
        },
        {
          text: "静风",
          onclick: () => {
            this.secretButtonClicked(gameData, tooltip, 2);
          },
        },
      ]);
    });
  }

  secretButtonClicked(gameData: GameData, tooltip: Tooltip, secret: number) {
    const card = gameData.gameObject.handCardList.selectedCards.list[0];
    const player = gameData.gameObject.selectedPlayers.list[0];
    NetworkEventCenter.emit(NetworkEventToS.USE_MI_LING_TOS, {
      cardId: card.id,
      targetPlayerId: player.id,
      secret,
      seq: gameData.gameObject.seq,
    });
    this.onDeselected(gameData, tooltip);
  }

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.resetSelectPlayer();
    gameData.gameObject.selectedPlayers.limit = 0;
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { targetPlayerId, targetCardId }: CardOnEffectParams) {}
}
