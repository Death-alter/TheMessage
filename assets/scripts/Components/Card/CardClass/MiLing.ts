import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Card } from "../../../Components/Card/Card";
import { CardColor, CardOnEffectParams, CardType, CardUsableStatus, MiLingOption } from "../type";
import { GamePhase } from "../../../Manager/type";
import { getCardColorText } from "../../../Utils";
import { GameManager } from "../../../Manager/GameManager";
import { CardOnEffect } from "../../../Event/GameEventType";
import { Player } from "../../Player/Player";
import { GameLog } from "../../GameLog/GameLog";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class MiLing extends Card {
  public readonly availablePhases = [GamePhase.SEND_PHASE_START];
  private _secretColor: CardColor[];

  get description() {
    let str = "传递阶段，指定一名角色代替你传出情报，你将这张牌面朝下递给该角色，并说出以下一个暗号,";
    if (this.secretColor) {
      const arr = ["东", "西", "静"];
      for (let i = 0; i < this.secretColor.length; i++) {
        const secretColor = this.secretColor[i];
        str += `<color=${Card.colors[secretColor]}>${arr[i]}风</color>`;
        if (i === 2) {
          str += "，";
        } else {
          str += "、";
        }
      }
    } else {
      str += "东风、西风、静风，";
    }
    str += "其必须传出暗号对应颜色的情报。若其没有对应颜色的手牌，则让你查看其手牌，你选择一张由其传出。";
    return str;
  }

  get secretColor() {
    return this._secretColor;
  }

  constructor(option: MiLingOption) {
    super({
      id: option.id,
      name: "密令",
      type: CardType.MI_LING,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._secretColor = option.secretColor;
  }

  canPlay(gui: GameManager) {
    for (let i = 1; i < gui.data.playerList.length; i++) {
      const player = gui.data.playerList[i];
      if (player.handCardCount > 0) {
        return true;
      }
    }
    return false;
  }

  onPlay(gui: GameManager): void {
    PlayerAction.switchToGroup("PlayCard")
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          tooltipText: "请选择密令的目标",
          num: 1,
          filter: (player: Player) => {
            return player.handCardCount > 0 && player.id !== 0;
          },
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
      })
      .addStep({
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            const tooltip = gui.tooltip;
            tooltip.setText("请选择一个暗号");
            tooltip.buttons.setButtons([
              {
                text: "东风",
                onclick: () => {
                  next({ secret: 0 });
                },
              },
              {
                text: "西风",
                onclick: () => {
                  next({ secret: 1 });
                },
              },
              {
                text: "静风",
                onclick: () => {
                  next({ secret: 2 });
                },
              },
              {
                text: "取消",
                onclick: () => {
                  prev();
                },
              },
            ]);
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.USE_MI_LING_TOS, {
          cardId: this.id,
          targetPlayerId: data[1].players[0].id,
          secret: data[0].secret,
          seq: gui.seq,
        });
      });
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, secret, card, hasColor, handCards }: CardOnEffectParams) {
    let secretText;
    switch (secret) {
      case 0:
        secretText = "东风";
        break;
      case 1:
        secretText = "西风";
        break;
      case 2:
        secretText = "静风";
        break;
    }
    const targetPlayer = gameData.playerList[targetPlayerId];

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}宣言了${secretText}`));

    if (hasColor) {
      if (targetPlayerId === 0) {
        const color: CardColor = card.secretColor[secret];
        GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
          card: this,
          handler: "promptTargetPlayerChooseCard",
          params: {
            color,
            secretText,
          },
        } as CardOnEffect);
      }
    } else {
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(targetPlayer)}没有对应颜色的卡牌，由${gameLog.formatPlayer(player)}选择一张牌传出`
        )
      );
      if (playerId === 0) {
        const handCardList = handCards.map((card) => {
          return gameData.createCard(card);
        });
        GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
          card: this,
          handler: "promptPlayerChooseCard",
          params: {
            handCardList,
          },
        } as CardOnEffect);
      }
    }
  }

  promptTargetPlayerChooseCard(gui: GameManager, params) {
    const { secretText, color } = params;
    const handCardList = gui.data.handCardList;
    const tooltip = gui.tooltip;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          let flag = true;
          let tooltipText = "密令的暗号为" + secretText;
          tooltipText += `,请选择一张${getCardColorText(color)}色情报传出`;
          tooltip.setText(tooltipText);
          gui.gameLayer.startSelectHandCards({
            num: 1,
            filter: (card) => {
              if (Card.hasColor(card, color) && (flag || gui.uiLayer.messageCanSend(card))) {
                return CardUsableStatus.USABLE;
              } else {
                return CardUsableStatus.UNUSABLE;
              }
            },
          });
          tooltip.buttons.setButtons([
            {
              text: "传递情报",
              onclick: () => {
                gui.uiLayer.doSendMessage({ message: gui.selectedHandCards.list[0], canCancel: false });
                next();
              },
              enabled: () => {
                return handCardList.selectedCards.list[0] && Card.hasColor(handCardList.selectedCards.list[0], color);
              },
            },
          ]);
        },
      }),
    });
    PlayerAction.start();
  }

  promptPlayerChooseCard(gui: GameManager, params) {
    if (!gui.isRecord) {
      const { handCardList } = params;
      const showCardsWindow = gui.showCardsWindow;
      showCardsWindow.show({
        title: "选择一张情报由目标传出",
        cardList: handCardList,
        limit: 1,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.MI_LING_CHOOSE_CARD_TOS, {
                cardId: showCardsWindow.selectedCards.list[0].id,
                seq: gui.seq,
              });
              showCardsWindow.hide();
            },
            enabled: () => !!showCardsWindow.selectedCards.list.length,
          },
        ],
      });
    }
  }

  onChooseCard(gameData: GameData, { playerId, targetPlayerId, card }: CardOnEffectParams) {
    if (targetPlayerId === 0) {
      GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
        card: this,
        handler: "promptSendMessage",
        params: {
          cardId: card.cardId,
        },
      } as CardOnEffect);
    }
  }

  promptSendMessage(gui: GameManager, params) {
    if (!gui.isRecord) {
      const { cardId } = params;
      const handCardContainer = gui.gameLayer.handCardContainer;
      let message;
      gui.gameLayer.startSelectHandCards({ num: 1 });
      for (let item of handCardContainer.data.list) {
        if ((<Card>item).id === cardId) {
          message = item;
          handCardContainer.selectCard(<Card>item);
          break;
        }
      }
      gui.gameLayer.lockSelectHandCards();
      gui.uiLayer.doSendMessage({ message, canCancel: false });
      PlayerAction.start();
    }
  }

  copy() {
    return new MiLing({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
      secretColor: this.secretColor?.slice(),
    });
  }
}
