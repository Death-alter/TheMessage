import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";
import { GameLog } from "../../GameLog/GameLog";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";

export class FenYunBianHuan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  private cardList: Card[];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: CardType.FENG_YUN_BIAN_HUAN,
      src: "FengYunBianHuan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameUI): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用风云变幻？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.USE_FENG_YUN_BIAN_HUAN_TOS, {
            cardId: this.id,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onShowCards(gameData: GameData, { cards }: CardOnEffectParams) {
    this.cardList = [];
    for (let card of cards) {
      this.cardList.push(gameData.createCard(card, CardStatus.FACE_UP));
    }
  }

  waitingForChooseCard(gameData: GameData, { playerId }: CardOnEffectParams) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    if (playerId !== 0) {
      GameEventCenter.emit(GameEvent.SHOW_CARDS, {
        title: `等待${gameLog.formatPlayer(player)}选择一张牌`,
        cardList: this.cardList,
        limit: 0,
        buttons: [],
      });
    } else {
      GameEventCenter.emit(GameEvent.SHOW_CARDS, {
        title: "请选择一张牌",
        cardList: this.cardList,
        limit: 1,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              const card = gameData.gameObject.showCardsWindow.selectedCards.list[0];
              gameData.gameObject.showCardsWindow.hide();
              const messages = player.getMessagesCopy();
              //flag为情报区是否有同色情报
              let flag = false;
              for (let color of card.color) {
                if (Card.hasColor(messages, color)) {
                  flag = true;
                  break;
                }
              }
              if (flag) {
                NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                  cardId: card.id,
                  asMessageCard: false,
                  seq: gameData.gameObject.seq,
                });
              } else {
                const tooltip = gameData.gameObject.tooltip;
                tooltip.setText(`是否将该牌置入情报区？`);
                tooltip.buttons.setButtons([
                  {
                    text: "加入手牌",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                        cardId: card.id,
                        asMessageCard: false,
                        seq: gameData.gameObject.seq,
                      });
                    },
                  },
                  {
                    text: "置入情报区",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.FENG_YUN_BIAN_HUAN_CHOOSE_CARD_TOS, {
                        cardId: card.id,
                        asMessageCard: true,
                        seq: gameData.gameObject.seq,
                      });
                    },
                  },
                ]);
              }
            },
            enabled: () => {
              return !!gameData.gameObject.showCardsWindow.selectedCards.list.length;
            },
          },
        ],
      });
    }
  }

  onChooseCard(gameData: GameData, { playerId, cardId, asMessageCard }: CardOnEffectParams) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    for (let i = 0; i < this.cardList.length; i++) {
      const card = this.cardList[i];
      if (card.id === cardId) {
        this.cardList.splice(i, 1);
        if (asMessageCard) {
          player.addMessage(card);
          GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
            player,
            message: card,
          });
          gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${gameLog.formatCard(card)}置入情报区`));
        } else {
          gameData.playerAddHandCard(player, card);
          GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
            player,
            card,
          });
          gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${gameLog.formatCard(card)}加入手牌`));
        }
        break;
      }
    }
  }

  onFinish(gui: GameUI) {
    gui.showCardsWindow.hide();
  }
}
