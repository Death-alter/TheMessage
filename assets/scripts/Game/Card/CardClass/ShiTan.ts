import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor, CardOnEffectParams, CardStatus, CardDirection } from "../type";
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

  onEffect(gameData: GameData, { userId, flag }: CardOnEffectParams) {}

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
          gameData.gameObject.handCardList.selectedCards.limit = 1;
          tooltip.setText(`请选择一张手牌丢弃`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.EXECUTE_SHI_TAN_TOS, {
                  cardId: [gameData.gameObject.handCardList.selectedCards.list[0].id],
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () => !!gameData.gameObject.handCardList.selectedCards.list.length,
            },
          ]);
        }
      }
    }
  }
}
