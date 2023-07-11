import {
  skill_guang_fa_bao_a_toc,
  skill_guang_fa_bao_b_toc,
  skill_wait_for_guang_fa_bao_b_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";
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
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_GUANG_FA_BAO_B_TOC);
  }

  onUse(gui: GameUI) {
    const tooltip = gui.tooltip;
    tooltip.setText("是否使用【广发报】？");

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_GUANG_FA_BAO_A_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gui.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId }: skill_guang_fa_bao_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【广发报】`));
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
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectHandCard",
        params: {
          player,
        },
      });
    }
  }

  promptSelectHandCard(gui: GameUI, params) {
    const { player } = params;
    const tooltip = gui.tooltip;
    tooltip.setText("请选择任意张手牌置入一名角色的情报区");
    gui.startSelectHandCard({ num: player.handCardCount });
    gui.startSelectPlayer({ num: 1 });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_GUANG_FA_BAO_B_TOS, {
            enable: true,
            targetPlayerId: gui.selectedPlayers.list[0].id,
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => {
          if (gui.selectedPlayers.list.length === 0) return false;
          const targetPlayer = gui.selectedPlayers.list[0];
          const colorCounts = targetPlayer.messageCounts;
          for (let card of gui.selectedHandCards.list) {
            for (let color of card.color) {
              ++colorCounts[color];
            }
          }
          if (colorCounts[CardColor.BLACK] < 3 && colorCounts[CardColor.BLUE] < 3 && colorCounts[CardColor.RED] < 3) {
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
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, enable, targetPlayerId, cards }: skill_guang_fa_bao_b_toc) {
    if (enable) {
      const gameLog = gameData.gameLog;
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];

      const handCards = gameData.playerRemoveHandCard(player, cards);
      targetPlayer.addMessage(handCards);

      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      let str = "";
      for (let card of handCards) {
        str += gameLog.formatCard(card);
      }
      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}把${str}置入${gameLog.formatPlayer(targetPlayer)}的情报区`)
      );
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }
  }
}
