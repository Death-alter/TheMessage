import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { CardPlayed } from "../../../Event/ProcessEventType";
import { Button } from "cc";

export class WeiBi extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      sprite: "images/cards/WeiBi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }

  //有人使用威逼
  onPlay(gameData: GameData, params: CardPlayed) {
    super.onPlay();
    if (params.targetPlayerId === 0) {
      const handCardList = gameData.gameObject.handCardList;
      const tooltip = gameData.gameObject.tooltip;
      const user = gameData.playerList[params.userId];

      handCardList.selectedCards.limit = 1;

      let cardTypeText;
      switch (params.wantType as CardType) {
        case CardType.JIE_HUO:
          cardTypeText = "截获";
          break;
        case CardType.WU_DAO:
          cardTypeText = "误导";
          break;
        case CardType.DIAO_BAO:
          cardTypeText = "调包";
          break;
        case CardType.CHENG_QING:
          cardTypeText = "澄清";
          break;
      }
      tooltip.setText(`【${user.seatNumber + 1}号】${user.name} 对你使用威逼，请选择一张【${cardTypeText}】交给该玩家`);
      const buttons = tooltip.setButtons([
        {
          text: "确定",
          onclick: () => {
            handCardList.selectedCards.list.forEach((card) => {
              NetworkEventCenter.emit(NetworkEventToS.WEI_BI_GIVE_CARD_TOS, {
                cardId: card.id,
                seq: gameData.gameObject.seq,
              });
            });
            ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
            ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
          },
          disabled: true,
        },
      ]);
      ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, (card: Card) => {
        if (card.type === params.wantType) {
          buttons[0].getComponent(Button).interactable = true;
        }
      });
      ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, () => {
        buttons[0].getComponent(Button).interactable = false;
      });
      tooltip.show();
    }
  }

  onEffect(gameData: GameData, params: CardOnEffectParams) {}

  onGiveCard(gameData: GameData, { userId, targetPlayerId, card }: CardOnEffectParams) {
    const user = gameData.playerList[userId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    let removedCard;
    if (card) {
      removedCard = targetPlayer.removeHandCard(card.cardId);
    }
    if (!removedCard) {
      removedCard = targetPlayer.removeHandCard(0);
    }
    user.addHandCard(removedCard);

    GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, {
      player: targetPlayer,
      targetPlayer: user,
      cardList: [removedCard],
    });
  }

  onShowHandCard(gameData: GameData, params: CardOnEffectParams) {}
}
