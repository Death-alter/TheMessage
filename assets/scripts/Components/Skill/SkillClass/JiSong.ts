import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { GamePhase } from "../../../Manager/type";
import { skill_ji_song_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class JiSong extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "急送",
      character,
      description:
        "争夺阶段限一次，你可以弃置两张手牌，或从你的情报区弃置一张非黑色情报，然后将待收情报移至一名角色面前。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JI_SONG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JI_SONG_TOC);
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`请选择一项`);
          gui.gameLayer.startSelectPlayers({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "弃置手牌",
              onclick: () => {
                next({ flag: 0 });
              },
              enabled: () => gui.data.selfPlayer.handCardCount > 1,
            },
            {
              text: "弃置情报",
              onclick: () => {
                next({ flag: 1 });
              },
              enabled: () =>
                gui.data.selfPlayer.messageCounts[CardColor.BLACK] < gui.data.selfPlayer.messageCounts.total,
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
          handler: ({ current }, { next, prev }) => {
            if (current.flag === 0) {
              tooltip.setText(`请选择两张手牌弃置`);
              gui.gameLayer.startSelectHandCards({
                num: 2,
              });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    next({ cardIds: gui.selectedHandCards.list.map((card) => card.id) });
                  },
                  enabled: () => gui.selectedHandCards.list.length === 2,
                },
                {
                  text: "取消",
                  onclick: () => {
                    prev();
                  },
                },
              ]);
            } else {
              showCardsWindow.show({
                title: "请选择一张非黑色情报弃置",
                limit: 1,
                cardList: gui.data.selfPlayer.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      next({ messageCard: showCardsWindow.selectedCards.list[0].id });
                      showCardsWindow.hide();
                    },
                    enabled: () =>
                      showCardsWindow.selectedCards.list.length &&
                      !Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      prev();
                    },
                  },
                ],
              });
            }
          },
        }),
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player) => player.id !== gui.data.messagePlayerId,
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .onComplete((data) => {
        if (data[2].flag === 0) {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
            cardIds: data[1].cardIds,
            targetPlayerId: data[0].playerId,
            seq: gui.seq,
          });
        } else {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
            messageCard: data[1].messageCard,
            targetPlayerId: data[0].playerId,
            seq: gui.seq,
          });
        }
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, messageCard, targetPlayerId }: skill_ji_song_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (messageCard) {
      const message = player.removeMessage(messageCard.cardId);
      GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player, messageList: [message] });
      new GameLog(`${gameLog.formatPlayer(player)}弃置情报${gameLog.formatCard(message)}`);
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
