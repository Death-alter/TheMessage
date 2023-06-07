import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDirection, CardOnEffectParams, CardType, MiLingOption } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { Player } from "../../Player/Player";

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
    gameData.gameObject.setPlayerSelectable((player: Player) => {
      return player.handCardCount > 0;
    });
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
    gameData.gameObject.clearPlayerSelectable();
    gameData.gameObject.resetSelectPlayer();
    gameData.gameObject.selectedPlayers.limit = 0;
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, secret, card, hasColor, handCards }: CardOnEffectParams) {
    if (hasColor) {
      //自己是目标
      if (targetPlayerId === 0) {
        const color: CardColor = card.secretColor[secret];
        const handCardList = gameData.gameObject.handCardList;
        const tooltip = gameData.gameObject.tooltip;
        handCardList.selectedCards.limit = 1;
        let tooltipText = "密令的暗号为";
        switch (secret) {
          case 0:
            tooltipText += "东风，";
            break;
          case 1:
            tooltipText += "西风，";
            break;
          case 2:
            tooltipText += "静风，";
            break;
        }
        switch (color) {
          case CardColor.BLACK:
            tooltipText += "请选择一张黑色情报传出";
            break;
          case CardColor.RED:
            tooltipText += "请选择一张红色情报传出";
            break;
          case CardColor.BLUE:
            tooltipText += "请选择一张蓝色情报传出";
            break;
        }

        tooltip.setText(tooltipText);
        tooltip.buttons.setButtons([
          {
            text: "传递情报",
            onclick: () => {
              gameData.gameObject.doSendMessage();
            },
            enabled: () => {
              return (
                handCardList.selectedCards.list[0] && handCardList.selectedCards.list[0].color.indexOf(color) !== -1
              );
            },
          },
        ]);
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
                const card = gameData.gameObject.showCardsWindow.selectedCards.list[0];
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

  async onChooseCard(gameData: GameData, { playerId, targetPlayerId, card }: CardOnEffectParams) {
    if (targetPlayerId === 0) {
      const handCardList = gameData.gameObject.handCardList;
      handCardList.selectedCards.limit = 1;
      for (let item of handCardList.list) {
        if (item.id === card.cardId) {
          handCardList.selectedCards.select(item);
        }
      }
      gameData.gameObject.doSendMessage();
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
