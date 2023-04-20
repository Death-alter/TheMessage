import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";

export class PoYi extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: CardType.PO_YI,
      sprite: "images/cards/PoYi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onPlay(seq: number) {
    super.onPlay();
    NetworkEventCenter.emit(NetworkEventToS.USE_PO_YI_TOS, {
      cardId: this.id,
      seq,
    });
  }

  onEffect(gameData: GameData, { targetCard }: CardOnEffectParams): void {
    if (targetCard) {
      targetCard = <Card>targetCard;
      targetCard.setStatus(CardStatus.FACE_UP);
      targetCard.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = targetCard;
      targetCard.flip();
    }
  }

  onShow(gameData: GameData, { user, targetCard, flag }: CardOnEffectParams) {
    console.log(targetCard, flag);
    if (flag && user.id !== 0) {
      targetCard = <Card>targetCard;
      targetCard.setStatus(CardStatus.FACE_UP);
      targetCard.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = targetCard;
      targetCard.flip();
    }
  }
}
