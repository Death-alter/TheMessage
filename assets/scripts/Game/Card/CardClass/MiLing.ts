import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardOnEffectParams, CardType, MiLingOption } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Player } from "../../Player/Player";
import { HandCardContianer } from "../../Container/HandCardContianer";
import { getCardColorText } from "../../../Utils";
import { GameLog } from "../../GameLog/GameLog";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

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
      src: "MiLing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._secretColor = option.secretColor;
  }

  onSelectedToPlay(gui: GameUI): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择密令的目标`);
    gui.startSelectPlayer({
      num: 1,
      filter: (player: Player) => {
        return player.handCardCount > 0 && player.id !== 0;
      },
      onSelect: () => {
        tooltip.setText(`请选择一个暗号`);
        tooltip.buttons.setButtons([
          {
            text: "东风",
            onclick: () => {
              this.secretButtonClicked(gui, 0);
            },
          },
          {
            text: "西风",
            onclick: () => {
              this.secretButtonClicked(gui, 1);
            },
          },
          {
            text: "静风",
            onclick: () => {
              this.secretButtonClicked(gui, 2);
            },
          },
        ]);
      },
    });
  }

  onDeselected(gui: GameUI) {
    gui.stopSelectPlayer();
    gui.clearSelectedPlayers();
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

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}宣言了${secretText}`));

    if (gameData.gameObject) {
      if (hasColor) {
        //自己是目标
        if (targetPlayerId === 0) {
          const color: CardColor = card.secretColor[secret];
          const handCardList = gameData.handCardList;
          const tooltip = gameData.gameObject.tooltip;
          let tooltipText = "密令的暗号为" + secretText;
          tooltipText += `,请选择一张${getCardColorText(color)}色情报传出`;
          tooltip.setText(tooltipText);
          gameData.gameObject.startSelectHandCard({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "传递情报",
              onclick: () => {
                gameData.gameObject.doSendMessage();
              },
              enabled: () => {
                return handCardList.selectedCards.list[0] && Card.hasColor(handCardList.selectedCards.list[0], color);
              },
            },
          ]);
        }
      } else {
        const targetPlayer = gameData.playerList[targetPlayerId];
        gameLog.addData(
          new GameLog(
            `【${targetPlayer.seatNumber + 1}号】${targetPlayer.character.name}没有对应颜色的卡牌，由【${
              player.seatNumber + 1
            }号】${player.character.name}选择一张牌传出`
          )
        );
        if (playerId === 0) {
          //自己是出牌者
          const handCardList = handCards.map((card) => {
            return gameData.createCard(card);
          });
          const showCardsWindow = gameData.gameObject.showCardsWindow;
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
                    seq: gameData.gameObject.seq,
                  });
                  showCardsWindow.hide();
                },
                enabled: () => !!showCardsWindow.selectedCards.list.length,
              },
            ],
          });
        }
      }
    }
  }

  onChooseCard(gameData: GameData, { playerId, targetPlayerId, card }: CardOnEffectParams) {
    if (targetPlayerId === 0) {
      const handCardList = gameData.handCardList;
      handCardList.selectedCards.limit = 1;
      for (let item of handCardList.list) {
        if (item.id === card.cardId) {
          (<HandCardContianer>handCardList.gameObject).selectCard(item);
          break;
        }
      }
      handCardList.selectedCards.lock();
      gameData.gameObject.doSendMessage();
    }
  }

  secretButtonClicked(gui: GameUI, secret: number) {
    const card = gui.selectedHandCards.list[0];
    const player = gui.selectedPlayers.list[0];
    NetworkEventCenter.emit(NetworkEventToS.USE_MI_LING_TOS, {
      cardId: card.id,
      targetPlayerId: player.id,
      secret,
      seq: gui.seq,
    });
    this.onDeselected(gui);
  }
}
