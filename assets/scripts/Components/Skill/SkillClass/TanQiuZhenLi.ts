import { skill_tan_qiu_zhen_li_a_toc, skill_tan_qiu_zhen_li_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { CardColor } from "../../Card/type";
import { copyCard } from "../../Card";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class TanQiuZhenLi extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "探求真理",
      character,
      description:
        "出牌阶段限一次，你可以从另一名角色的情报区中选择一张情报，将其置入你的情报区，但不能以此令你收集三张或更多同色情报。然后该角色可以将其手牌或情报区中的一张纯黑色牌置入你的情报区。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAN_QIU_ZHEN_LI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAN_QIU_ZHEN_LI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAN_QIU_ZHEN_LI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAN_QIU_ZHEN_LI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  canUse(gui: GameManager): boolean {
    let total = 0;
    for (let player of gui.data.playerList) {
      if (player.id !== 0) {
        total += player.messageCounts.total;
      }
    }
    return total !== 0;
  }

  onUse(gui: GameManager) {
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addTempStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        filter: (player) => player.id !== 0 && player.messageCounts.total > 0,
      },
      resolver: (data) => {
        return { playerId: data.players[0].id };
      },
    })
      .addTempStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          enabled: () => {
            if (showCardsWindow.selectedCards.list.length === 0) return false;
            const card = showCardsWindow.selectedCards.list[0];
            const colorCounts = gui.data.selfPlayer.messageCounts;
            for (let i of card.color) {
              if (colorCounts[i] >= 2) {
                return false;
              }
            }
            return true;
          },
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAN_QIU_ZHEN_LI_A_TOS, {
          cardId: data[0].cardId,
          targetPlayerId: data[1].playerId,
          seq: gui.seq,
        });
      });
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, cardId, waitingSecond, seq }: skill_tan_qiu_zhen_li_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const message = targetPlayer.removeMessage(cardId);
    player.addMessage(message);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player,
      message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【探求真理】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
          message
        )}置入自己的情报区`
      )
    );

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: targetPlayerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (targetPlayerId === 0) {
      const handCards = gameData.handCardList.list.map((card) => copyCard(card));
      const messages = targetPlayer.getMessagesCopy();

      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectCard",
        params: {
          player,
          handCards,
          messages,
        },
      });
    }
  }

  promptSelectCard(gui: GameManager, params) {
    const showCardsWindow = gui.showCardsWindow;
    const tooltip = gui.tooltip;
    const gameLog = gui.gameLog;
    const { player, handCards, messages } = params;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          let flag = false;
          for (let card of [...handCards, ...messages]) {
            if (card.color.length === 1 && card.color[0] === CardColor.BLACK) {
              flag = true;
            }
          }
          if (flag) {
            tooltip.setText(`是否把一张牌置入${gameLog.formatPlayer(player)}的情报区？`);
            tooltip.buttons.setButtons([
              {
                text: "是",
                onclick: () => {
                  next();
                },
                enabled: flag,
              },
              {
                text: "否",
                onclick: () => {
                  prev();
                },
              },
            ]);
          } else {
            tooltip.setText(`你没有纯黑色牌，无法选择置入`);
            tooltip.buttons.setButtons([
              {
                text: "确定",
                onclick: () => {
                  prev();
                },
              },
            ]);
          }
        },
      }),
    })
      .addStep({
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            showCardsWindow.show({
              title: "请选择一张纯黑色牌",
              limit: 1,
              cardList: [...handCards, ...messages],
              tags: [...handCards.map(() => "手牌"), ...messages.map(() => "情报区")],
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    const cardId = showCardsWindow.selectedCards.list[0].id;
                    const index = showCardsWindow.cardList.list.indexOf(showCardsWindow.selectedCards.list[0]);
                    let fromHand;
                    if (index < handCards.length) {
                      fromHand = true;
                    } else {
                      fromHand = false;
                    }
                    showCardsWindow.hide();
                    next({
                      cardId,
                      fromHand,
                    });
                  },
                  enabled: () =>
                    showCardsWindow.selectedCards.list.length > 0 &&
                    showCardsWindow.selectedCards.list[0].color.length === 1 &&
                    showCardsWindow.selectedCards.list[0].color[0] === CardColor.BLACK,
                },
                {
                  text: "取消",
                  onclick: () => {
                    prev();
                  },
                },
              ],
            });
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAN_QIU_ZHEN_LI_B_TOS, {
          enable: true,
          cardId: data[0].cardId,
          fromHand: data[0].fromHand,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAN_QIU_ZHEN_LI_B_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { enable, playerId, targetPlayerId, card, fromHand }: skill_tan_qiu_zhen_li_b_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      let message;
      if (fromHand) {
        message = gameData.playerRemoveHandCard(targetPlayer, card);
      } else {
        message = targetPlayer.removeMessage(card.cardId);
      }
      player.addMessage(message);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player,
        message,
        from: {
          location: fromHand ? CardActionLocation.PLAYER_HAND_CARD : CardActionLocation.PLAYER_MESSAGE_ZONE,
          player: targetPlayer,
        },
      });
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
