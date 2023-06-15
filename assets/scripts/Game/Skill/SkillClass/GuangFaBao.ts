import {
  skill_guang_fa_bao_a_toc,
  skill_guang_fa_bao_b_toc,
  skill_miao_bi_qiao_bian_a_toc,
  skill_miao_bi_qiao_bian_b_toc,
  skill_wait_for_guang_fa_bao_b_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../../Card/Card";
import { CardColor } from "../../Card/type";
import { Character } from "../../Character/Character";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class GuangFaBao extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "广发报",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后摸三张牌，并且你可以将你的任意张手牌置入任意名角色的情报区。你不能通过此技能让任何角色收集三张或更多同色情报。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GUANG_FA_BAO_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GUANG_FA_BAO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_GUANG_FA_BAO_B_TOC,
      (data) => {
        this.waitingForUseB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_GUANG_FA_BAO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_GUANG_FA_BAO_B_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("是否使用【广发报】？");

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_GUANG_FA_BAO_A_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  waitingForUseB(gameData: GameData, { playerId, waitingSecond, seq }: skill_wait_for_guang_fa_bao_b_toc) {
    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      const player = gameData.playerList[playerId];
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText("请选择任意张手牌置入一名角色的情报区");
      gameData.gameObject.startSelectHandCard({ num: player.handCardCount });
      gameData.gameObject.startSelectPlayer({ num: 1 });
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_GUANG_FA_BAO_B_TOS, {
              enable: true,
              targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
              cardIds: gameData.gameObject.selectedHandCards.list.map((card) => card.id),
              seq,
            });
          },
          enabled: () => {
            if (gameData.gameObject.selectedPlayers.list.length === 0) return false;
            const targetPlayer = gameData.gameObject.selectedPlayers.list[0];
            const colorCounts = targetPlayer.messageCounts;
            for (let card of gameData.gameObject.selectedHandCards.list) {
              for (let color of card.color) {
                switch (color) {
                  case CardColor.BLACK:
                    ++colorCounts.black;
                    break;
                  case CardColor.RED:
                    ++colorCounts.red;
                    break;
                  case CardColor.BLUE:
                    ++colorCounts.blue;
                    break;
                }
              }
            }
            if (colorCounts.black < 3 && colorCounts.blue < 3 && colorCounts.red < 3) {
              return true;
            } else {
              return false;
            }
          },
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_GUANG_FA_BAO_B_TOS, {
              enable: false,
              seq,
            });
          },
        },
      ]);
    }
  }

  onEffectA(gameData: GameData, { playerId }: skill_guang_fa_bao_a_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];

    if (playerId === 0) {
      this.gameObject?.lock();
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【广发报】`));
  }

  onEffectB(gameData: GameData, { playerId, enable, targetPlayerId, cards }: skill_guang_fa_bao_b_toc) {
    if (enable) {
      const gameLog = gameData.gameObject.gameLog;
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];

      let handCards: Card[];
      if (playerId === 0) {
        handCards = player.removeHandCard(cards.map((card) => card.cardId));
        for (let card of handCards) {
          gameData.gameObject.handCardList.removeData(card);
        }
      } else {
        handCards = player.removeHandCard(new Array(cards.length).fill(0));
      }

      targetPlayer.addMessage(handCards);

      gameData.gameObject.cardAction.addCardToMessageZone({
        player: targetPlayer,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}把${cards.length}张手牌置入【${
            targetPlayer.seatNumber + 1
          }号】${targetPlayer.character.name}的情报区`
        )
      );
    } else {
      if (playerId === 0) {
        this.gameObject?.unlock();
        this.gameObject.isOn = false;
      }
    }
  }
}
