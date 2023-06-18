import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardOnEffectParams } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { IdentityType } from "../../Identity/type";

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
      sprite: "images/cards/ShiTan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    tooltip.setText(`请选择试探的目标`);
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
      onSelect: () => {
        tooltip.setText(`是否使用试探？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              const card = gameData.gameObject.handCardList.selectedCards.list[0];
              const player = gameData.gameObject.selectedPlayers.list[0];
              NetworkEventCenter.emit(NetworkEventToS.USE_SHI_TAN_TOS, {
                cardId: card.id,
                playerId: player.id,
                seq: gameData.gameObject.seq,
              });
              this.onDeselected(gameData);
            },
          },
        ]);
      },
    });
  }

  onDeselected(gameData: GameData) {
    gameData.gameObject.stopSelectPlayer();
    gameData.gameObject.clearSelectedPlayers();
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
      shiTanCard.gameObject = gameData.cardOnPlay.gameObject;
      gameData.cardOnPlay = shiTanCard;
      const tooltip = gameData.gameObject.tooltip;
      if (shiTanCard.drawCardColor.indexOf(player.identityList[0].type) !== -1) {
        //是抽卡的身份
        NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
          cardId: [],
          seq: gameData.gameObject.seq,
        });
      } else {
        if (player.handCardCount === 0) {
          NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
            cardId: [],
            seq: gameData.gameObject.seq,
          });
        } else {
          tooltip.setText(`请选择一张手牌丢弃`);
          gameData.gameObject.startSelectHandCard({ num: 1 });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
                  cardId: [gameData.gameObject.selectedHandCards.list[0].id],
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () => !!gameData.gameObject.selectedHandCards.list.length,
            },
          ]);
        }
      }
    }
  }
}
