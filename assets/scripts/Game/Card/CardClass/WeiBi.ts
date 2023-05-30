import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { CardPlayed } from "../../../Event/ProcessEventType";
import { Tooltip } from "../../../GameManager/Tooltip";

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

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.selectedPlayers.limit = 1;
    gameData.gameObject.setPlayerSelectable((player) => {
      return player.id !== 0;
    });
    tooltip.setText(`请选择威逼的目标`);
    ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, () => {
      gameData.gameObject.showCardsWindow.show({
        title: "选择目标交给你的卡牌种类",
        cardList: [
          gameData.createCardByType(CardType.JIE_HUO),
          gameData.createCardByType(CardType.WU_DAO),
          gameData.createCardByType(CardType.DIAO_BAO),
          gameData.createCardByType(CardType.CHENG_QING),
        ],
        limit: 1,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              const card = gameData.gameObject.handCardList.selectedCards.list[0];
              const player = gameData.gameObject.selectedPlayers.list[0];
              NetworkEventCenter.emit(NetworkEventToS.USE_WEI_BI_TOS, {
                cardId: card.id,
                playerId: player.id,
                wantType: gameData.gameObject.showCardsWindow.selectedCards.list[0].type,
                seq: gameData.gameObject.seq,
              });
              gameData.gameObject.resetSelectPlayer();
              gameData.gameObject.selectedPlayers.limit = 0;
              gameData.gameObject.clearPlayerSelectable();
              gameData.gameObject.showCardsWindow.hide();
              ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
            },
            enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
          },
          {
            text: "取消",
            onclick: () => {
              gameData.gameObject.showCardsWindow.hide();
              gameData.gameObject.resetSelectPlayer();
            },
          },
        ],
      });
    });
  }

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.selectedPlayers.limit = 0;
    gameData.gameObject.clearPlayerSelectable();
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  //有人使用威逼
  onPlay(gameData: GameData, params: CardPlayed) {
    if (params.targetPlayerId === 0) {
      const handCardList = gameData.gameObject.handCardList;
      const tooltip = gameData.gameObject.tooltip;
      const user = gameData.playerList[params.userId];

      handCardList.selectedCards.limit = 1;
      console.log(handCardList.selectedCards.limit)

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
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.WEI_BI_GIVE_CARD_TOS, {
              cardId: handCardList.selectedCards.list[0].id,
              seq: gameData.gameObject.seq,
            });
          },
          enabled: () => {
            return (
              handCardList.selectedCards.list.length === 1 &&
              handCardList.selectedCards.list[0].type === params.wantType
            );
          },
        },
      ]);
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
    if (user.id === 0) {
      removedCard = gameData.createCard(card);
      // gameData.gameObject.handCardList.addData(removedCard);
    }
    user.addHandCard(removedCard);

    GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, {
      player: targetPlayer,
      targetPlayer: user,
      cardList: [removedCard],
    });
  }

  onShowHandCard(gameData: GameData, params: CardOnEffectParams) {
    if (params.userId === 0) {
      gameData.gameObject.showCardsWindow.show({
        title: "目标展示手牌",
        cardList: params.cards.map((card) => {
          return gameData.createCard(card);
        }),
        limit: 0,
        buttons: [
          {
            text: "关闭",
            onclick: () => {
              gameData.gameObject.showCardsWindow.hide();
            },
          },
        ],
      });
    }
  }
}
