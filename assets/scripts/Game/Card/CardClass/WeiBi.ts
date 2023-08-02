import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { CardPlayed } from "../../../Event/ProcessEventType";
import { GameLog } from "../../GameLog/GameLog";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class WeiBi extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      src: "WeiBi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameUI) {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择威逼的目标`);
    gui.startSelectPlayer({
      num: 1,
      filter: (player) => {
        return player.id !== 0;
      },
      onSelect: () => {
        const showCardsWindow = gui.showCardsWindow;
        showCardsWindow.show({
          title: "选择目标交给你的卡牌种类",
          cardList: [
            gui.data.createCardByType(CardType.JIE_HUO),
            gui.data.createCardByType(CardType.WU_DAO),
            gui.data.createCardByType(CardType.DIAO_BAO),
            gui.data.createCardByType(CardType.CHENG_QING),
          ],
          limit: 1,
          buttons: [
            {
              text: "确定",
              onclick: () => {
                const player = gui.selectedPlayers.list[0];
                NetworkEventCenter.emit(NetworkEventToS.USE_WEI_BI_TOS, {
                  cardId: this.id,
                  playerId: player.id,
                  wantType: showCardsWindow.selectedCards.list[0].type,
                  seq: gui.seq,
                });
                showCardsWindow.hide();
                this.onDeselected(gui);
              },
              enabled: () => !!gui.showCardsWindow.selectedCards.list.length,
            },
            {
              text: "取消",
              onclick: () => {
                gui.showCardsWindow.hide();
                gui.clearSelectedPlayers();
              },
            },
          ],
        });
      },
    });
  }

  onDeselected(gui: GameUI) {
    gui.stopSelectPlayer();
    gui.clearSelectedPlayers();
  }

  //有人使用威逼
  onEffect(gameData: GameData, { userId, targetPlayerId, wantType }: CardPlayed) {
    const user = gameData.playerList[userId];
    const gameLog = gameData.gameLog;
    const userText = gameLog.formatPlayer(user);

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
    gameLog.addData(new GameLog(`${userText}宣言了【${cardTypeText}】`));

    //自己被威逼
    if (targetPlayerId === 0) {
      GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
        card: this,
        handler: "promptChooseCard",
        params: {
          userText,
          cardTypeText,
          wantType,
        },
      });
    }
  }

  promptChooseCard(gui: GameUI, params) {
    const { userText, cardTypeText, wantType } = params;
    const tooltip = gui.tooltip;
    tooltip.setText(`【${userText} 对你使用威逼，请选择一张【${cardTypeText}】交给该玩家`);
    gui.startSelectHandCard({
      num: 1,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.WEI_BI_GIVE_CARD_TOS, {
            cardId: gui.selectedHandCards.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => {
          return gui.selectedHandCards.list.length === 1 && gui.selectedHandCards.list[0].type === wantType;
        },
      },
    ]);
    tooltip.show();
  }

  //威逼给牌
  onGiveCard(gameData: GameData, { userId, targetPlayerId, card }: CardOnEffectParams) {
    const user = gameData.playerList[userId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const removedCard = gameData.playerRemoveHandCard(targetPlayer, card);
    gameData.playerAddHandCard(user, removedCard);

    GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, {
      player: targetPlayer,
      targetPlayer: user,
      cardList: [removedCard],
    });
  }

  //目标没有宣言的牌，展示手牌
  onShowHandCard(gameData: GameData, { userId, cards, targetPlayerId, wantType }: CardOnEffectParams) {
    const user = gameData.playerList[userId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

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
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(user)}宣言了【${cardTypeText}】`));
    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(targetPlayer)}没有宣言的牌，对${gameLog.formatPlayer(user)}展示手牌`)
    );

    if (userId === 0) {
      const cardList = cards.map((card) => {
        return gameData.createCard(card);
      });
      GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
        card: this,
        handler: "showHandCards",
        params: {
          cardList,
        },
      });
    }
  }

  showHandCards(gui: GameUI, params) {
    const { cardList } = params;
    gui.showCardsWindow.show({
      title: "目标展示手牌",
      cardList,
      limit: 0,
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            gui.showCardsWindow.hide();
          },
        },
      ],
    });
  }
}
