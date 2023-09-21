import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_jiao_ji_a_toc, skill_jiao_ji_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class JiaoJi extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "交际",
      character,
      description:
        "出牌阶段限一次，你可以抽取一名角色的最多两张手牌，然后将等量的手牌交给该角色。你每收集一张黑色情报，便可以少交一张手牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAO_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAO_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAO_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAO_JI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAO_JI_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cards, unknownCardCount, waitingSecond, seq }: skill_jiao_ji_a_toc
  ) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

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

    const handCards = gameData.playerRemoveHandCard(
      targetPlayer,
      unknownCardCount ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
    );
    gameData.playerAddHandCard(player, handCards);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: handCards,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseHandCard",
        params: {
          num: handCards.length,
          player,
        },
      });
    }

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}抽取了${gameLog.formatPlayer(targetPlayer)}${handCards.length}张手牌`)
    );
  }

  promptChooseHandCard(gui: GameManager, params) {
    const { num, player } = params;
    const tooltip = gui.tooltip;
    const minNum = num - player.messageCounts[CardColor.BLACK];

    if (player.messageCounts[CardColor.BLACK] === 0) {
      tooltip.setText(`请选择${num}张手牌交给该角色`);
    } else {
      tooltip.setText(`请选择${minNum > 0 ? minNum : 0} - ${num}张手牌交给该角色`);
    }
    gui.gameLayer.startSelectHandCards({
      num,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAO_JI_B_TOS, {
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length >= minNum,
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, unknownCardCount }: skill_jiao_ji_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const handCards = gameData.playerRemoveHandCard(
      player,
      unknownCardCount ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
    );

    gameData.playerAddHandCard(targetPlayer, handCards);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player: targetPlayer,
      card: handCards,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}交给了${gameLog.formatPlayer(targetPlayer)}${handCards.length}张手牌`)
    );

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
