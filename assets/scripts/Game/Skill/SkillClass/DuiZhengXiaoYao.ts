import {
  skill_dui_zheng_xia_yao_a_toc,
  skill_dui_zheng_xia_yao_b_toc,
  skill_dui_zheng_xia_yao_c_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { getCardColorText } from "../../../Utils";
import { Character } from "../../Character/Character";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

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
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC,
      (data) => {
        this.onEffectC(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DUI_ZHENG_XIA_YAO_C_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("是否使用【对症下药】？");

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_A_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, waitingSecond, seq }: skill_dui_zheng_xia_yao_a_toc) {
    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【对症下药】`));

    if (playerId === 0 && gameData.gameObject) {
      this.gameObject?.lock();
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText("请选择两张含有相同颜色的手牌展示");
      gameData.gameObject.startSelectHandCard({
        num: 2,
      });

      tooltip.buttons.setButtons([
        {
          text: "展示",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_B_TOS, {
              enable: true,
              cardIds: gameData.gameObject.selectedHandCards.list.map((card) => card.id),
              seq,
            });
          },
          enabled: () => {
            const list = gameData.gameObject.selectedHandCards.list;
            if (list.length < 2) return false;
            for (let color0 of list[0].color) {
              for (let color1 of list[1].color) {
                if (color0 === color1) return true;
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
              seq,
            });
          },
        },
      ]);
    }
  }

  onEffectB(gameData: GameData, { playerId, enable, cards, waitingSecond, seq }: skill_dui_zheng_xia_yao_b_toc) {
    if (enable) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      const gameLog = gameData.gameLog;
      const player = gameData.playerList[playerId];
      const showCardsWindow = gameData.gameObject.showCardsWindow;
      const cardList = cards.map((card) => gameData.createCard(card));

      if (gameData.gameObject) {
        if (playerId !== 0) {
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
        } else {
          const colorList = [];
          for (let color0 of cardList[0].color) {
            for (let color1 of cardList[1].color) {
              if (color0 === color1) colorList.push(color0);
            }
          }

          const tooltip = gameData.gameObject.tooltip;
          tooltip.setText("请选择一名角色");
          tooltip.buttons.setButtons([]);
          gameData.gameObject.startSelectPlayer({
            num: 1,
            filter: (player) => {
              for (let color of colorList) {
                if (player.messageCounts[color] > 0) return true;
              }
              return false;
            },
            onSelect: (player) => {
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
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_DUI_ZHENG_XIA_YAO_C_TOS, {
                        targetPlayerId: player.id,
                        messageCardId: showCardsWindow.selectedCards.list[0].id,
                        seq,
                      });
                      showCardsWindow.hide();
                    },
                    enabled: () => {
                      if (showCardsWindow.selectedCards.list.length === 0) return false;
                      for (let color of showCardsWindow.selectedCards.list[0].color) {
                        if (colorList.indexOf(color) !== -1) {
                          return true;
                        }
                      }
                      return false;
                    },
                  },
                ],
              });
            },
          });
        }
      }

      gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}展示了两张手牌`));
    }
  }

  onEffectC(gameData: GameData, { playerId, targetPlayerId, messageCardId }: skill_dui_zheng_xia_yao_c_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    const targetPlayer = gameData.playerList[targetPlayerId];

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }

    const message = targetPlayer.removeMessage(messageCardId);
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.removeMessage({
        player,
        messageList: [message],
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}从【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }情报区弃置${gameLog.formatCard(message)}`
      )
    );
  }
}
