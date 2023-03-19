import EventTarget from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor } from "../type";

export class ShiTan extends Card {
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
      usage: option.usage,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onPlay({ playerId, seq }: { playerId: number; seq: number }) {
    super.onPlay();
    EventTarget.emit(NetworkEventToS.USE_SHI_TAN_TOS, {
      cardId: this.id,
      playerId,
      seq,
    });
  }

}
