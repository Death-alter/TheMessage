import { skill_yu_si_wang_po_a_toc, skill_yu_si_wang_po_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { CardColor } from "../../Card/type";

export class YuSiWangPo extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "鱼死网破",
      character,
      description: "出牌阶段限一次，你可以弃置一张手牌，令一名其他角色弃置[你的黑色情报数量+1]张手牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YU_SI_WANG_PO_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YU_SI_WANG_PO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YU_SI_WANG_PO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_YU_SI_WANG_PO_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张手牌弃置",
        num: 1,
        enabled: () => gui.selectedHandCards.list.length > 0,
      },
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player: Player) => player.id !== 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_YU_SI_WANG_PO_A_TOS, {
          targetPlayerId: data[0].players[0].id,
          cardIds: data[1].cards.map((card) => card.id),
          seq: gui.seq,
        });
      });
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, waitingSecond, seq }: skill_yu_si_wang_po_a_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (waitingSecond > 0) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: targetPlayerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (targetPlayerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "chooseDiscardCards",
          params: {
            num: player.messageCounts[CardColor.BLACK],
          },
        });
      }
    }
  }

  chooseDiscardCards(gui: GameManager, params) {
    const { num } = params;
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择${num}张手牌弃置`);
    gui.gameLayer.startSelectHandCards({
      num,
    });
    gui.tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_YU_SI_WANG_PO_B_TOS, {
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length === num,
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId }: skill_yu_si_wang_po_b_toc) {
    const player = gameData.playerList[playerId];

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
