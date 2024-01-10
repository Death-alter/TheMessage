import { skill_tao_qu_a_toc, skill_tao_qu_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { getCardColorText } from "../../../Utils";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameLog } from "../../GameLog/GameLog";
import { CardColor } from "../../Card/type";

export class TaoQu extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "套取",
      character,
      description:
        "出牌阶段限一次，你可以展示两张含有相同颜色的手牌，然后从一名其他角色的情报区，把一张对应颜色的情报加入手牌，该角色摸一张牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAO_QU_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAO_QU_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAO_QU_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAO_QU_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const totalCounts: { [key in CardColor]: number } = {
      [CardColor.BLACK]: 0,
      [CardColor.RED]: 0,
      [CardColor.BLUE]: 0,
    };
    for (let player of gui.data.playerList) {
      if (player.id !== 0) {
        totalCounts[CardColor.BLACK] += player.messageCounts[CardColor.BLACK];
        totalCounts[CardColor.RED] += player.messageCounts[CardColor.RED];
        totalCounts[CardColor.BLUE] += player.messageCounts[CardColor.BLUE];
      }
    }

    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择两张含有相同颜色的手牌展示",
        num: 2,
        enabled: () => {
          const list = gui.selectedHandCards.list;
          if (list.length < 2) return false;
          for (let color0 of list[0].color) {
            for (let color1 of list[1].color) {
              if (color0 === color1 && totalCounts[color0] > 0) return true;
            }
          }
          return false;
        },
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_TAO_QU_A_TOS, {
        cardIds: data[0].cards.map((card) => card.id),
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, colors, cards, waitingSecond, seq }: skill_tao_qu_a_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "chooseMessage",
        params: { colors },
      });
    } else {
      const cardList = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showHandcard",
        params: {
          cardList,
        },
      });
    }
  }

  showHandcard(gui: GameManager, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "【套取】展示手牌",
      limit: 0,
      cardList,
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            showCardsWindow.hide();
          },
        },
      ],
    });
  }

  chooseMessage(gui: GameManager, params) {
    const { colors } = params;
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        filter: (player) => {
          if (player.id === 0) return false;
          for (let color of colors) {
            if (player.messageCounts[color] > 0) return true;
          }
          return false;
        },
        enabled: () => gui.selectedPlayers.list.length > 0,
        canCancel: false,
      },
    })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev }) => {
            const player = current.players[0];
            const showCardsWindow = gui.showCardsWindow;
            let title;
            if (colors.length === 1) {
              title = `选择一张${getCardColorText(colors[0])}色情报加入手牌`;
            } else {
              title = `选择一张${getCardColorText(colors[0])}色或${getCardColorText(colors[1])}色情报加入手牌`;
            }
            showCardsWindow.show({
              title,
              limit: 1,
              cardList: player.getMessagesCopy(),
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    const cardId = showCardsWindow.selectedCards.list[0].id;
                    showCardsWindow.hide();
                    next({ cardId });
                  },
                  enabled: () => {
                    if (showCardsWindow.selectedCards.list.length === 0) return false;
                    for (let color of showCardsWindow.selectedCards.list[0].color) {
                      if (colors.indexOf(color) !== -1) {
                        return true;
                      }
                    }
                    return false;
                  },
                },
                {
                  text: "取消",
                  onclick: () => {
                    showCardsWindow.hide();
                    prev();
                  },
                },
              ],
            });
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAO_QU_B_TOS, {
          targetPlayerId: data[1].players[0].id,
          cardId: data[0].cardId,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_tao_qu_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const card = targetPlayer.removeMessage(cardId);
    gameData.playerAddHandCard(player, card);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: card,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
          card
        )}加入手牌`
      )
    );

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
