import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_miao_bi_qiao_bian_a_toc, skill_miao_bi_qiao_bian_b_toc } from "../../../../protobuf/proto";
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
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class MiaoBiQiaoBian extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "妙笔巧辩",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后从所有角色的情报区选择合计至多两张不含有相同颜色的情报，将其加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_BI_QIAO_BIAN_B_TOC);
  }

  canUse(gui: GameManager): boolean {
    for (let player of gui.data.playerList) {
      if (player.messageCounts.total > 0) {
        return true;
      }
    }
    return false;
  }

  onUse(gui: GameManager) {
    PlayerAction.addTempStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        filter: (player) => player.messageCounts.total > 0,
      },
    })
      .addTempStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          tooltipText: "请选择第一张情报",
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_A_TOS, {
          cardId: data[0].cardId,
          targetPlayerId: data[1].playerId,
          seq: gui.seq,
        });
      });
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cardId, waitingSecond, seq }: skill_miao_bi_qiao_bian_a_toc
  ) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const message = targetPlayer.removeMessage(cardId);
    gameData.playerAddHandCard(player, message);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseCard",
        params: {
          message,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【妙笔巧辩】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}情报区中的${gameLog.formatCard(
          message
        )}加入手牌`
      )
    );
  }

  promptChooseCard(gui: GameManager, params) {
    const { message } = params;
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: ({}, { next, prev }) => {
          tooltip.setText("是否选择第二张牌？");
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next();
              },
            },
            {
              text: "取消",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player) => player.messageCounts.total > 0,
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          tooltipText: "请选择第二张情报",
          enabled: () => {
            if (showCardsWindow.selectedCards.list.length === 0) return false;
            if (message.color.length === 1) {
              return showCardsWindow.selectedCards.list[0].color.indexOf(message.color[0]) === -1;
            } else {
              return (
                showCardsWindow.selectedCards.list[0].color.indexOf(message.color[0]) === -1 &&
                showCardsWindow.selectedCards.list[0].color.indexOf(message.color[1]) === -1
              );
            }
          },
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_B_TOS, {
          enable: true,
          cardId: data[0].cardId,
          targetPlayerId: data[1].players[0].id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_B_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_miao_bi_qiao_bian_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const message = targetPlayer.removeMessage(cardId);
    gameData.playerAddHandCard(player, message);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}情报区中的${gameLog.formatCard(
          message
        )}加入手牌`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
