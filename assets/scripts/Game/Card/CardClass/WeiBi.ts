import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { CardPlayed } from "../../../Event/ProcessEventType";
import { Tooltip } from "../../../GameManager/Tooltip";
import { GameLog } from "../../GameLog/GameLog";

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
    tooltip.setText(`请选择威逼的目标`);
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => {
        return player.id !== 0;
      },
      onSelect: () => {
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
                gameData.gameObject.showCardsWindow.hide();
                this.onDeselected(gameData);
              },
              enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
            },
            {
              text: "取消",
              onclick: () => {
                gameData.gameObject.showCardsWindow.hide();
                gameData.gameObject.clearSelectedPlayers();
              },
            },
          ],
        });
      },
    });
  }

  onDeselected(gameData: GameData) {
    gameData.gameObject.stopSelectPlayer();
    gameData.gameObject.clearSelectedPlayers();
  }

  //有人使用威逼
  onEffect(gameData: GameData, { userId, targetPlayerId, wantType }: CardPlayed) {
    const user = gameData.playerList[userId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    let cardTypeText;
    switch (wantType as CardType) {
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
    gameData.gameObject.gameLog.addData(
      new GameLog(`【${user.seatNumber + 1}号】${user.character.name}宣言了【${cardTypeText}】`)
    );

    //自己被威逼
    if (targetPlayerId === 0) {
      const handCardList = gameData.gameObject.handCardList;
      const tooltip = gameData.gameObject.tooltip;

      handCardList.selectedCards.limit = 1;
      tooltip.setText(
        `【${user.seatNumber + 1}号】${user.character.name} 对你使用威逼，请选择一张【${cardTypeText}】交给该玩家`
      );
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
            return handCardList.selectedCards.list.length === 1 && handCardList.selectedCards.list[0].type === wantType;
          },
        },
      ]);
      tooltip.show();
    }
  }

  //威逼给牌
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
    }
    user.addHandCard(removedCard);

    GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, {
      player: targetPlayer,
      targetPlayer: user,
      cardList: [removedCard],
    });
  }

  //目标没有宣言的牌，展示手牌
  onShowHandCard(gameData: GameData, { userId, cards, targetPlayerId }: CardOnEffectParams) {
    if (userId === 0) {
      gameData.gameObject.showCardsWindow.show({
        title: "目标展示手牌",
        cardList: cards.map((card) => {
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
