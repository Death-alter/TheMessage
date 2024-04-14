import { skill_an_cang_sha_ji_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameManager } from "../../../Manager/GameManager";
import { CardActionLocation } from "../../../Manager/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { Card } from "../../Card/Card";

export class AnCangShaJi extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "暗藏杀机",
      character,
      description:
        "你接收蓝色情报或你传出的蓝色情报被接收后，可以选择一项：\n♦把你的情报区中一张纯黑色情报置入传出者/接收者的情报区。\n♦你抽取传出者/接收者的一张手牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_AN_CANG_SHA_JI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_AN_CANG_SHA_JI_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          if (gui.data.senderId === 0) {
            tooltip.setText(`你传出的蓝色情报被接收，是否使用【暗藏杀机】？`);
          } else {
            tooltip.setText(`你接收了蓝色情报，是否使用【暗藏杀机】？`);
          }
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
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            tooltip.setText(`请选择一项`);
            tooltip.buttons.setButtons([
              {
                text: "置入情报",
                onclick: () => {
                  next({ drawCard: false });
                },
                enabled: () => Card.hasColor(gui.data.handCardList.list, CardColor.BLACK),
              },
              {
                text: "抽取手牌",
                onclick: () => {
                  next({ drawCard: true });
                },
                enabled: () => {
                  const player =
                    gui.data.playerList[gui.data.senderId === 0 ? gui.data.messagePlayerId : gui.data.senderId];
                  return player.handCardCount > 0;
                },
              },
            ]);
          },
        }),
      })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev, passOnPrev }) => {
            if (current.drawCard) {
              passOnPrev(() => {
                next();
              });
            } else {
              showCardsWindow.show();
              showCardsWindow.show({
                title: "请选择一张纯黑色情报",
                limit: 1,
                cardList: gui.data.selfPlayer.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      const cardId = showCardsWindow.selectedCards.list[0].id;
                      showCardsWindow.hide();
                      next({ cardId });
                    },
                    enabled: () =>
                      showCardsWindow.selectedCards.list.length > 0 &&
                      showCardsWindow.selectedCards.list[0].color.length === 1 &&
                      showCardsWindow.selectedCards.list[0].color[0] === CardColor.BLACK,
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
            }
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_AN_CANG_SHA_JI_TOS, {
          cardId: data[0].cardId || 0,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId, handCard }: skill_an_cang_sha_ji_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (cardId) {
      const message = player.removeMessage(cardId);
      targetPlayer.addMessage(message);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}将情报区的${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
            targetPlayer,
          )}的情报区`,
        ),
      );
    } else {
      const card = gameData.playerRemoveHandCard(targetPlayer, handCard);
      gameData.playerAddHandCard(player, card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: player,
        card,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}抽取${gameLog.formatPlayer(targetPlayer)}的一张手牌`),
      );
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
