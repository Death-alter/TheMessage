import { skill_bo_ai_a_toc, skill_bo_ai_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Character } from "../../Character/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class BoAi extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "博爱",
      character,
      description:
        "出牌阶段限一次，你可以摸一张牌，然后可以将一张手牌交给另一名角色，若交给了女性角色或女性玩家，则你再摸一张牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_BO_AI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_BO_AI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_BO_AI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_BO_AI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;

    tooltip.setText(`是否使用【博爱】`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_A_TOS, {
            seq: gameData.gameObject.seq,
          });
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

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_bo_ai_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0 && gameData.gameObject) {
      this.gameObject?.lock();
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText("请选择一张手牌交给另一名角色");
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
            NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_B_TOS, {
              targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
              cardId: gameData.gameObject.selectedHandCards.list[0].id,
              seq,
            });
          },
          enabled: () =>
            gameData.gameObject.selectedPlayers.list.length === 1 &&
            gameData.gameObject.selectedHandCards.list.length === 1,
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_B_TOS, {
              cardId: 0,
              seq,
            });
          },
        },
      ]);
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【博爱】`));
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card }: skill_bo_ai_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    let handCard = player.removeHandCard(card.cardId);
    if (!handCard) {
      player.removeHandCard(0);
      handCard = gameData.createCard(card);
    }
    targetPlayer.addHandCard(handCard);

    if (playerId === 0) {
      gameData.gameObject.handCardList.removeData(handCard);
    }

    if (gameData.gameObject) {
      gameData.gameObject.cardAction.giveCards({ player, targetPlayer, cardList: [handCard] });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把一张牌交给【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }`
      )
    );

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
    ++this.usageCount;
  }
}
