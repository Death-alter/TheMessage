import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_ji_ban_a_toc, skill_ji_ban_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class JiBan extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "羁绊",
      character,
      description: "出牌阶段限一次，可以摸两张牌，然后将至少一张手牌交给另一名角色。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JI_BAN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JI_BAN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JI_BAN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JI_BAN_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameUI) {
    const tooltip = gui.tooltip;

    tooltip.setText(`是否使用【羁绊】`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_BAN_A_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gui.promptUseHandCard("出牌阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_ji_ban_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectHandCard",
        params: {
          num: player.handCardCount,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【羁绊】`));
  }

  promptSelectHandCard(gui: GameUI, params) {
    const { num } = params;
    const tooltip = gui.tooltip;

    tooltip.setText("请选择至少一张手牌交给一名角色");
    gui.startSelectHandCard({
      num,
    });
    gui.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_BAN_B_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length > 0 && gui.selectedPlayers.list.length > 0,
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, unknownCardCount }: skill_ji_ban_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

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
      new GameLog(`${gameLog.formatPlayer(player)}交给${gameLog.formatPlayer(targetPlayer)}${handCards.length}张手牌`)
    );
    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
