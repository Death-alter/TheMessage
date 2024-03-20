import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Card } from "../../../Components/Card/Card";
import { ShiTanOption, CardType, CardOnEffectParams } from "../type";
import { GamePhase } from "../../../Manager/type";
import { IdentityType } from "../../Identity/type";
import { GameManager } from "../../../Manager/GameManager";
import { CardOnEffect } from "../../../Event/GameEventType";
import { GameLog } from "../../GameLog/GameLog";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Identity } from "../../Identity/Identity";

export class ShiTan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];
  private _drawCardColor: IdentityType[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  get description() {
    let str = "出牌阶段，将这张牌面朝下递给另一名角色，其必须根据自己的身份牌如实执行：<br/>";
    if (this.drawCardColor) {
      const array = ["神秘人", "潜伏战线", "特工机关"];
      let drawStr = "";
      let disCardStr = "";
      for (let i = 0; i < 3; i++) {
        if (this.drawCardColor.indexOf(i) === -1) {
          if (disCardStr.length) {
            disCardStr += "或";
          }
          disCardStr += `<color=${Identity.colors[i]}>${array[i]}</color>`;
        } else {
          if (drawStr.length) {
            drawStr += "或";
          }
          drawStr += `<color=${Identity.colors[i]}>${array[i]}</color>`;
        }
      }

      disCardStr += "：弃置一张手牌。<br/>";
      drawStr += "：摸一张牌。";
      str += disCardStr + drawStr;
    }
    return str;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onPlay(gui: GameManager): void {
    PlayerAction.switchToGroup("PlayCard")
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          tooltipText: "请选择试探的目标",
          num: 1,
          filter: (player) => {
            return player.id !== 0;
          },
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.USE_SHI_TAN_TOS, {
          cardId: this.id,
          playerId: data[0].players[0].id,
          seq: gui.seq,
        });
      });
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

  promptDiscardCard(gui: GameManager, params) {
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
        gui.gameLayer.startSelectHandCards({ num: 1 });
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

  copy() {
    return new ShiTan({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
      drawCardColor: this.drawCardColor?.slice(),
    });
  }
}
