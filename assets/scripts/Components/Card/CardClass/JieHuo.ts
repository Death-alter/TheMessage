import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class JieHuo extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  get description() {
    return "争夺阶段，将待收情报移至你的面前。";
  }

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      entity: option.entity,
    });
  }

  onPlay(gui: GameManager): void {
    NetworkEventCenter.emit(NetworkEventToS.USE_JIE_HUO_TOS, {
      cardId: this.id,
      seq: gui.seq,
    });
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }

  copy() {
    return new JieHuo({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
    });
  }
}
