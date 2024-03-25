import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_zhuang_zhi_man_huai_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { CardActionLocation } from "../../../Manager/type";
import { Card } from "../../Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class ZhuangZhiManHuai extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "壮志满怀",
      character,
      description:
        "你接收红色情报或你传出的红色情报被接收后，可以选择一项：\n♦从你或传出者/接收者的情报区中选择一张黑色情报加入你的手牌。\n♦你和传出者/接收者各摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZHUANG_ZHI_MAN_HUAI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHUANG_ZHI_MAN_HUAI_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          if (gui.data.senderId === 0) {
            tooltip.setText(`你传出的红色情报被接收，是否使用【壮志满怀】？`);
          } else {
            tooltip.setText(`你接收了红色情报，是否使用【壮志满怀】？`);
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
                text: "拿取情报",
                onclick: () => {
                  next({ drawCard: false });
                },
              },
              {
                text: "摸一张牌",
                onclick: () => {
                  next({ drawCard: true });
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
              gui.tooltip.setText("请选择一名角色");
              gui.gameLayer.stopSelectPlayers();
              gui.gameLayer.startSelectPlayers({
                num: 1,
                filter: (player) => player.id === gui.data.senderId || player.id === gui.data.messagePlayerId,
              });
              const buttons: any[] = [
                {
                  text: "确定",
                  onclick: () => {
                    next({ playerId: gui.selectedPlayers.list[0].id });
                  },
                  enabled: () => gui.selectedPlayers.list.length === 1,
                },
                {
                  text: "取消",
                  onclick: () => {
                    prev();
                  },
                },
              ];
              gui.tooltip.buttons.setButtons(buttons);
            }
          },
        }),
      })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev, passOnPrev }) => {
            if (current.playerId == null) {
              passOnPrev(() => {
                next();
              });
            } else {
              const player = gui.data.playerList[current.playerId];
              showCardsWindow.show({
                title: "请选择一张黑色情报加入手牌",
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
                      if (!Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK)) return false;
                      return true;
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
            }
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_ZHUANG_ZHI_MAN_HUAI_TOS, {
          cardId: data[0].messageCardId || 0,
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

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_zhuang_zhi_man_huai_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (card) {
      const message = targetPlayer.removeMessage(card.cardId);
      gameData.playerAddHandCard(player, message);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
            message
          )}加入手牌`
        )
      );
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
