import {
  skill_dui_zheng_xia_yao_a_toc,
  skill_dui_zheng_xia_yao_b_toc,
  skill_dui_zheng_xia_yao_c_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { getCardColorText } from "../../../Utils";
import { Character } from "../../../Components/Chatacter/Character";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { ActiveSkill } from "../../../Components/Skill/Skill";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { CardColor } from "../../Card/type";

export class DuiZhengXiaoYao extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "对症下药",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后摸三张牌，并且你可以展示两张含有相同颜色的手牌，然后从一名角色的情报区，弃置一张对应颜色的情报。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC,
      (data) => {
        this.onEffectC(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_dui_zheng_xia_yao_a_toc) {
    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptShowHandCards",
      });
    }
  }

  promptShowHandCards(gui: GameManager) {
    const totalCounts: { [key in CardColor]: number } = {
      [CardColor.BLACK]: 0,
      [CardColor.RED]: 0,
      [CardColor.BLUE]: 0,
    };
    for (const player of gui.data.playerList) {
      totalCounts[CardColor.BLACK] += player.messageCounts[CardColor.BLACK];
      totalCounts[CardColor.RED] += player.messageCounts[CardColor.RED];
      totalCounts[CardColor.BLUE] += player.messageCounts[CardColor.BLUE];
    }

    const tooltip = gui.tooltip;
    tooltip.setText("请选择两张含有相同颜色的手牌展示");
    gui.gameLayer.startSelectHandCards({
      num: 2,
    });

    tooltip.buttons.setButtons([
      {
        text: "展示",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_B_TOS, {
            enable: true,
            cardIds: gui.selectedHandCards.list.map((card) => card.id),
            seq: gui.seq,
          });
        },
        enabled: () => {
          const list = gui.selectedHandCards.list;
          if (list.length < 2) return false;
          for (const color0 of list[0].color) {
            for (const color1 of list[1].color) {
              if (color0 === color1 && totalCounts[color0] > 0) return true;
            }
          }
          return false;
        },
      },
      {
        text: "不展示",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_B_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, enable, cards, waitingSecond, seq }: skill_dui_zheng_xia_yao_b_toc) {
    const player = gameData.playerList[playerId];
    if (enable) {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      const gameLog = gameData.gameLog;
      const cardList = cards.map((card) => gameData.createCard(card));
      if (playerId !== 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "showHandCards",
          params: {
            cardList,
          },
        });
      } else {
        const colorList = [];
        for (const color0 of cardList[0].color) {
          for (const color1 of cardList[1].color) {
            if (color0 === color1) colorList.push(color0);
          }
        }

        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "promptSelectPlayer",
          params: {
            colorList,
          },
        });
      }
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}展示了两张手牌`));
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }

  showHandCards(gui: GameManager, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "【对症下药】展示手牌",
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

  promptSelectPlayer(gui: GameManager, params) {
    const { colorList } = params;
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText("请选择一名角色");
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next({
                  player: gui.selectedPlayers.list[0],
                });
              },
              enabled: () => gui.selectedPlayers.list.length > 0,
            },
          ]);
          gui.gameLayer.startSelectPlayers({
            num: 1,
            filter: (player) => {
              for (const color of colorList) {
                if (player.messageCounts[color] > 0) return true;
              }
              return false;
            },
          });
        },
      }),
    })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev }) => {
            const { player } = current;
            let title;
            if (colorList.length === 1) {
              title = `选择一张${getCardColorText(colorList[0])}色情报弃置`;
            } else {
              title = `选择一张${getCardColorText(colorList[0])}色或${getCardColorText(colorList[1])}色情报弃置`;
            }
            showCardsWindow.show({
              title,
              limit: 1,
              cardList: player.getMessagesCopy(),
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    const messageCardId = showCardsWindow.selectedCards.list[0].id;
                    showCardsWindow.hide();
                    next({ messageCardId });
                  },
                  enabled: () => {
                    if (showCardsWindow.selectedCards.list.length === 0) return false;
                    for (const color of showCardsWindow.selectedCards.list[0].color) {
                      if (colorList.indexOf(color) !== -1) {
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
        NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_C_TOS, {
          targetPlayerId: data[1].player.id,
          messageCardId: data[0].messageCardId,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectC(gameData: GameData, { playerId, targetPlayerId, messageCardId }: skill_dui_zheng_xia_yao_c_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    const targetPlayer = gameData.playerList[targetPlayerId];
    const message = targetPlayer.removeMessage(messageCardId);

    GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, {
      player: targetPlayer,
      messageList: [message],
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}从${gameLog.formatPlayer(targetPlayer)}}情报区弃置${gameLog.formatCard(
          message,
        )}`,
      ),
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
