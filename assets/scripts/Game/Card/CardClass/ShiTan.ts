import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardOnEffectParams } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { IdentityType } from "../../Identity/type";
import { GameLog } from "../../GameLog/GameLog";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";
import { CardOnEffect } from "../../../Event/GameEventType";

export class ShiTan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];
  private _drawCardColor: IdentityType[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      src: "ShiTan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onSelectedToPlay(gui: GameUI): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择试探的目标`);
    gui.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
      onSelect: () => {
        tooltip.setText(`是否使用试探？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              const card = gui.selectedHandCards.list[0];
              const player = gui.selectedPlayers.list[0];
              NetworkEventCenter.emit(NetworkEventToS.USE_SHI_TAN_TOS, {
                cardId: card.id,
                playerId: player.id,
                seq: gui.seq,
              });
              this.onDeselected(gui);
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

  onEffect(gameData: GameData, { targetPlayerId, flag }: CardOnEffectParams) {
    if (this._drawCardColor && this._drawCardColor.length > 0) {
      const player = gameData.playerList[targetPlayerId];
      if (this._drawCardColor.length === 1) {
        if (flag) {
          player.confirmIdentity(<number>this._drawCardColor[0]);
        } else {
          player.ruleOutIdentity(<number>this._drawCardColor[0]);
        }
      } else {
        const arr = [IdentityType.BLUE, IdentityType.GREEN, IdentityType.RED];
        for (let i = 0; i < this._drawCardColor.length; i++) {
          const index = arr.indexOf(this._drawCardColor[i]);
          if (index !== -1) {
            arr.splice(index, 1);
          }
        }
        if (flag) {
          player.ruleOutIdentity(<number>arr[0]);
        } else {
          player.confirmIdentity(<number>arr[0]);
        }
      }
    }
  }

  onShow(gameData: GameData, { userId, targetPlayerId, card }: CardOnEffectParams) {
    //自己是被试探的目标时展示那张试探牌
    if (targetPlayerId === 0) {
      const player = gameData.playerList[targetPlayerId];
      const shiTanCard = <ShiTan>gameData.createCard(card);
      const gameLog = gameData.gameLog;

      shiTanCard.gameObject = gameData.cardOnPlay.gameObject;
      gameData.cardOnPlay = shiTanCard;

      const array = ["神秘人", "潜伏战线", "特工机关"];
      let drawStr = "";
      let disCardStr = "";
      for (let i = 0; i < 3; i++) {
        if (shiTanCard.drawCardColor.indexOf(i) === -1) {
          if (disCardStr.length) {
            disCardStr += "或";
          }
          disCardStr += array[i];
        } else {
          if (drawStr.length) {
            drawStr += "或";
          }
          drawStr += array[i];
        }
      }

      disCardStr += "：弃置一张手牌。";
      drawStr += "：摸一张牌。";
      gameLog.addData(new GameLog(`试探内容：${disCardStr}${drawStr}`));

      GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
        card: this,
        handler: "promptDiscardCard",
        params: {
          shiTanCard,
          player,
        },
      } as CardOnEffect);
    }
  }

  promptDiscardCard(gui: GameUI, params) {
    const { shiTanCard, player } = params;
    const tooltip = gui.tooltip;
    if (shiTanCard.drawCardColor.indexOf(player.identityList[0].type) !== -1) {
      if (!gui.isRecord) {
        //是抽卡的身份
        NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
          cardId: [],
          seq: gui.seq,
        });
      }
    } else {
      if (player.handCardCount === 0) {
        if (!gui.isRecord) {
          NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
            cardId: [],
            seq: gui.seq,
          });
        }
      } else {
        tooltip.setText(`请选择一张手牌丢弃`);
        gui.startSelectHandCard({ num: 1 });
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
                cardId: [gui.selectedHandCards.list[0].id],
                seq: gui.seq,
              });
            },
            enabled: () => !!gui.selectedHandCards.list.length,
          },
        ]);
      }
    }
  }
}
