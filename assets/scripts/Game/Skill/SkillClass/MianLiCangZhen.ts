import { card, skill_mian_li_cang_zhen_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { LiNingYuSP } from "../../Character/CharacterClass/LiNingYuSP";
import { Card } from "../../Card/Card";

export class MianLiCangZhen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "绵里藏针",
      character,
      description: "你传出的情报被接收后，可以将一张黑色手牌置入接收者的情报区，然后摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你传出的情报被接收，是否使用【绵里藏针】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张黑色手牌`);
          gameData.gameObject.startSelectHandCard({ num: 1 });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAN_LI_CANG_ZHEN_TOS, {
                  cardId: gameData.gameObject.selectedHandCards.list[0].id,
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () => {
                return (
                  gameData.gameObject.selectedHandCards.list.length &&
                  Card.hasColor(gameData.gameObject.selectedHandCards.list[0], CardColor.BLACK)
                );
              },
            },
          ]);
        },
        enabled: () => Card.hasColor(gameData.gameObject.handCardList.list, CardColor.BLACK),
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_mian_li_cang_zhen_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;
    let handCard = player.removeHandCard(card.cardId);
    if (!handCard) {
      player.removeHandCard(0);
      handCard = gameData.createCard(card);
    }
    targetPlayer.addMessage(handCard);
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【绵里藏针】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}将手牌${gameLog.formatCard(handCard)}置入【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的情报区`
      )
    );

    if (playerId === 0) {
      gameData.gameObject.handCardList.removeData(handCard);
    }
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.messagePlacedIntoMessageZone({ player: targetPlayer, message: handCard });
    }
  }
}
