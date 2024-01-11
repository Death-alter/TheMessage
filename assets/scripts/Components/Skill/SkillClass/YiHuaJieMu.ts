import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_yi_hua_jie_mu_a_toc, skill_yi_hua_jie_mu_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class YiHuaJieMu extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "移花接木",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后从一名角色的情报区选择一张情报，将其置入另一名角色的情报区，若如此做会让其收集三张或更多同色情报，则改为将该牌加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_HUA_JIE_MU_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_HUA_JIE_MU_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_HUA_JIE_MU_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_HUA_JIE_MU_B_TOC);
  }

  canUse(gui: GameManager): boolean {
    let total = 0;
    for (let player of gui.data.playerList) {
      total += player.messageCounts.total;
    }
    return total !== 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_HUA_JIE_MU_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_yi_hua_jie_mu_a_toc) {
    const player = gameData.playerList[playerId];
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.USE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectMessage",
      });
    }
  }

  promptSelectMessage(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择要获取情报的角色",
        filter: (player) => {
          return player.messageCounts.total > 0;
        },
      },
      resolver: (data) => {
        return { playerId: data.players[0].id };
      },
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          tooltipText: "请选择要置入情报的角色",
          filter: (player, current) => {
            console.log(current)
            return player.id !== current.playerId;
          },
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_HUA_JIE_MU_B_TOS, {
          fromPlayerId: data[2].playerId,
          cardId: data[1].message.id,
          toPlayerId: data[0].playerId,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(
    gameData: GameData,
    { playerId, fromPlayerId, toPlayerId, cardId, joinIntoHand }: skill_yi_hua_jie_mu_b_toc
  ) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const fromPlayer = gameData.playerList[fromPlayerId];
    const toPlayer = gameData.playerList[toPlayerId];
    const message = fromPlayer.removeMessage(cardId);

    if (joinIntoHand) {
      gameData.playerAddHandCard(player, message);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(fromPlayer)}的情报${gameLog.formatCard(message)}加入${gameLog.formatPlayer(
            player
          )}的手牌`
        )
      );
    } else {
      toPlayer.addMessage(message);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: toPlayer,
        message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });

      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(fromPlayer)}的情报${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
            toPlayer
          )}的情报区`
        )
      );
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
