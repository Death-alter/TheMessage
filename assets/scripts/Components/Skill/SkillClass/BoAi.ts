import { skill_bo_ai_a_toc, skill_bo_ai_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

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

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_bo_ai_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectHandCard",
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【博爱】`));
  }

  promptSelectHandCard(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一张手牌交给另一名角色");
    gui.gameLayer.startSelectHandCards({ num: 1 });
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_B_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            cardId: gui.selectedHandCards.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedPlayers.list.length === 1 && gui.selectedHandCards.list.length === 1,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_BO_AI_B_TOS, {
            cardId: 0,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card, enable }: skill_bo_ai_b_toc) {
    const player = gameData.playerList[playerId];
    if (enable) {
      const targetPlayer = gameData.playerList[targetPlayerId];

      const handCard = gameData.playerRemoveHandCard(player, card);
      gameData.playerAddHandCard(targetPlayer, handCard);

      GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, { player, targetPlayer, cardList: [handCard] });
    }
    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
