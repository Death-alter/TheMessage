import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_jin_bi_a_toc, skill_jin_bi_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { getCardTypeCount } from "../../Card";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { TagName } from "../../../type";

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
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, waitingSecond, seq }: skill_jin_bi_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: targetPlayerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (targetPlayerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseHandCard",
        params: {
          player,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}指定${gameLog.formatPlayer(targetPlayer)}`));
  }

  promptChooseHandCard(gui: GameManager, params) {
    const { player } = params;
    const tooltip = gui.tooltip;
    const gameLog = gui.data.gameLog;

    tooltip.setText(`请选择两张手牌交给${gameLog.formatPlayer(player)}`);
    gui.gameLayer.startSelectHandCards({
      num: 2,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_B_TOS, {
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length === 2,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_BI_B_TOS, {
            cardIds: [],
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, unknownCardCount }: skill_jin_bi_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (unknownCardCount === 0 && cards.length === 0) {
      targetPlayer.banAllCards();
      targetPlayer.banSkills();

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}被【禁闭】`));
    } else {
      const handCards = gameData.playerRemoveHandCard(
        targetPlayer,
        unknownCardCount > 0 ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
      );
      gameData.playerAddHandCard(player, handCards);

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}交给${gameLog.formatPlayer(player)}两张手牌`));
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
