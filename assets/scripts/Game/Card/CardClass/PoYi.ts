import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class PoYi extends Card {
  public readonly availablePhases = [GamePhase.SEND_PHASE];

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
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    if (gameData.messageInTransmit.status === CardStatus.FACE_UP) {
      tooltip.setText(`该情报无需破译`);
    } else {
      tooltip.setText(`是否使用破译？`);
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            const card = gameData.gameObject.handCardList.selectedCards.list[0];
            NetworkEventCenter.emit(NetworkEventToS.USE_PO_YI_TOS, {
              cardId: card.id,
              seq: gameData.gameObject.seq,
            });
          },
        },
      ]);
    }
  }

  onDeselected(gameData: GameData) {}

  onEffect(gameData: GameData, { userId, targetCard }: CardOnEffectParams): void {
    if (userId === 0) {
      const message = gameData.createMessage(targetCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();
      if (message.color.indexOf(CardColor.BLACK) !== -1) {
        const tooltip = gameData.gameObject.tooltip;
        tooltip.setText(`是否翻开并摸一张牌？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.PO_YI_SHOW_TOS, {
                show: true,
                seq: gameData.gameObject.seq,
              });
            },
          },
          {
            text: "取消",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.PO_YI_SHOW_TOS, {
                show: false,
                seq: gameData.gameObject.seq,
              });
            },
          },
        ]);
      } else {
        // gameData.gameObject.tooltip.setText("");
        // gameData.gameObject.tooltip.buttons.setButtons([]);
        NetworkEventCenter.emit(NetworkEventToS.PO_YI_SHOW_TOS, {
          show: false,
          seq: gameData.gameObject.seq,
        });
      }
    }
  }

  onShow(gameData: GameData, { userId, targetCard, flag }: CardOnEffectParams) {
    if (flag && userId !== 0) {
      const message = gameData.createMessage(targetCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();
    }
  }
}
