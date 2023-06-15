import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_yi_xin_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS } from "../../../Event/type";
import { WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class YiXin extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "遗信",
      character,
      description: "你死亡前，可以将一张手牌置入另一名角色的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_XIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_XIN_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_YI_XIN_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`是否使用【遗信】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张手牌和一名角色`);
          gameData.gameObject.startSelectHandCard({
            num: 1,
          });
          gameData.gameObject.startSelectPlayer({
            num: 1,
            filter: (player) => player.id !== 0,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_XIN_TOS, {
                  enable: true,
                  cardId: gameData.gameObject.selectedHandCards.list[0].id,
                  targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () =>
                gameData.gameObject.selectedHandCards.list.length > 0 &&
                gameData.gameObject.selectedPlayers.list.length > 0,
            },
          ]);
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_XIN_TOS, {
            enable: false,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card, enable }: skill_yi_xin_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameObject.gameLog;
      let handCard = player.removeHandCard(card.cardId);
      if (!handCard) {
        player.removeHandCard(0);
        handCard = gameData.createCard(card);
      }
      targetPlayer.addMessage(card);
      if (playerId === 0) {
        gameData.gameObject.handCardList.removeData(handCard);
      }

      gameData.gameObject.cardAction.addCardToMessageZone({
        player: targetPlayer,
        card: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: player },
      });

      gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【遗信】`));
      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}把手牌${gameLog.formatCard(handCard)}置入【${
            targetPlayer.seatNumber + 1
          }号】${targetPlayer.character.name}的情报区`
        )
      );
    }
  }
}
