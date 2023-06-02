import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDirection, CardOnEffectParams, CardType, MiLingOption } from "../type";
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

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.resetSelectPlayer();
    gameData.gameObject.selectedPlayers.limit = 0;
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, hasColor, handCards }: CardOnEffectParams) {
    if (hasColor) {
      //自己是目标
      if (targetPlayerId === 0) {
        gameData.gameObject.promotSendMessage("请选择一张牌作为情报传出");
      }
    } else {
      //自己是出牌者
      if (playerId === 0) {
        const handCardList = handCards.map((card) => {
          return gameData.createCard(card);
        });
        gameData.gameObject.showCardsWindow.show({
          title: "选择一张情报由目标传出",
          cardList: handCardList,
          limit: 1,
          buttons: [
            {
              text: "确定",
              onclick: () => {
                const card = gameData.gameObject.handCardList.selectedCards.list[0];
                NetworkEventCenter.emit(NetworkEventToS.MI_LING_CHOOSE_CARD_TOS, {
                  cardId: card.id,
                  seq: gameData.gameObject.seq,
                });
                gameData.gameObject.showCardsWindow.hide();
              },
              enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
            },
          ],
        });
      }
    }
  }

  async onChooseCard(gameData: GameData, { playerId, targetPlayerId, cardId }: CardOnEffectParams) {
    if (targetPlayerId === 0) {
      const handCardList = gameData.gameObject.handCardList;
      handCardList.selectedCards.limit = 0;
      for (let card of handCardList.list) {
        if (card.id === cardId) {
          handCardList.selectedCards.select(card);
        }
      }
      const card = handCardList.selectedCards.list[0];
      const data: any = {
        cardId: card.id,
        lockPlayerId: [],
        cardDir: card.direction,
        seq: gameData.gameObject.seq,
      };
      const tooltip = gameData.gameObject.tooltip;

      await (() => {
        return new Promise((resolve, reject) => {
          switch (card.direction) {
            case CardDirection.LEFT:
              data.targetPlayerId = gameData.playerList.length - 1;
              resolve(null);
              break;
            case CardDirection.RIGHT:
              data.targetPlayerId = 1;
              resolve(null);
              break;
            case CardDirection.UP:
              tooltip.setText("请选择要传递情报的目标");
              gameData.gameObject.setPlayerSelectable((player) => {
                return player.id !== 0;
              });
              tooltip.buttons.setButtons([]);
              gameData.gameObject.selectedPlayers.limit = 1;
              ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, (player) => {
                data.targetPlayerId = player.id;
                resolve(null);
              });
              break;
          }
        });
      })();

      if (card.lockable) {
        await (() => {
          return new Promise((resolve, reject) => {
            switch (card.direction) {
              case CardDirection.LEFT:
              case CardDirection.RIGHT:
                gameData.gameObject.selectedPlayers.limit = 1;
                gameData.gameObject.setPlayerSelectable((player) => {
                  return player.id !== 0;
                });
                tooltip.setText("请选择一名角色锁定");
                break;
              case CardDirection.UP:
                gameData.gameObject.setPlayerSelectable((player) => {
                  return player.id === data.targetPlayerId;
                });
                tooltip.setText("是否锁定该角色");
                break;
            }
            tooltip.buttons.setButtons([
              {
                text: "锁定",
                onclick: () => {
                  switch (card.direction) {
                    case CardDirection.LEFT:
                    case CardDirection.RIGHT:
                      data.lockPlayerId = [gameData.gameObject.selectedPlayers.list[0].id];
                      break;
                    case CardDirection.UP:
                      data.lockPlayerId = [data.targetPlayerId];
                      break;
                  }
                  handCardList.selectedCards.limit = 0;
                  resolve(null);
                },
                enabled: () => {
                  return gameData.gameObject.selectedPlayers.list.length === 1;
                },
              },
              {
                text: "不锁定",
                onclick: () => {
                  handCardList.selectedCards.limit = 0;
                  resolve(null);
                },
              },
            ]);
          });
        })();
      }

      NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, data);
      gameData.gameObject.scheduleOnce(() => {
        gameData.gameObject.clearPlayerSelectable();
        gameData.gameObject.resetSelectPlayer();
        gameData.gameObject.selectedPlayers.limit = 0;
      }, 0);
    }
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
}
