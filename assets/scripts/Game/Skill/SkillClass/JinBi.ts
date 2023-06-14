import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jin_bi_a_toc, skill_jin_bi_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class JinBi extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "禁闭",
      character,
      description:
        "出牌阶段限一次，你可以指定一名角色，除非其交给你两张手牌，否则其本回合不能使用手牌，且所有角色技能无效。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_BI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_BI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_BI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_BI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;

    tooltip.setText(`请选择一名角色`);
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player: Player) => player.id !== 0,
    });

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_A_TOS, {
            targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => {
          return gameData.gameObject.selectedPlayers.list.length === 1;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, waitingSecond, seq }: skill_jin_bi_a_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: targetPlayerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      this.gameObject?.lock();
    }

    if (targetPlayerId === 0) {
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText(`请选择两张手牌交给【${player.seatNumber + 1}号】${player.character.name}`);
      gameData.gameObject.startSelectHandCard({
        num: 2,
      });
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_B_TOS, {
              cardIds: gameData.gameObject.selectedHandCards.list.map((card) => card.id),
              seq: seq,
            });
          },
          enabled: () => gameData.gameObject.selectedHandCards.list.length === 2,
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_B_TOS, {
              cardIds: [],
              seq: seq,
            });
          },
        },
      ]);
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}使用技能【禁闭】,指定【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, unknownCardCount }: skill_jin_bi_b_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (unknownCardCount === 0 && cards.length === 0) {
      if (targetPlayerId === 0) {
        gameData.gameObject.selectedHandCards.lock();
        GameEventCenter.once(GameEvent.RECEIVE_PHASE_END, () => {
          gameData.gameObject.selectedHandCards.unlock();
        });
      }
      gameLog.addData(new GameLog(`【${targetPlayer.seatNumber + 1}号】${targetPlayer.character.name}被【禁闭】`));
    } else {
      let handCards;
      if (targetPlayerId === 0) {
        handCards = targetPlayer.removeHandCard(cards.map((card) => card.cardId));
        for (let card of handCards) {
          gameData.gameObject.handCardList.removeData(card);
        }
      } else if (playerId === 0) {
        targetPlayer.removeHandCard(cards.map(() => 0));
        handCards = cards.map((card) => gameData.createCard(card));
      } else {
        handCards = targetPlayer.removeHandCard(new Array(unknownCardCount).fill(0));
      };

      player.addHandCard(handCards);
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });
      gameLog.addData(
        new GameLog(
          `【${targetPlayer.seatNumber + 1}号】${targetPlayer.character.name}交给【${player.seatNumber + 1}号】${
            player.character.name
          }两张手牌`
        )
      );
    }

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
    ++this.usageCount;
  }
}
