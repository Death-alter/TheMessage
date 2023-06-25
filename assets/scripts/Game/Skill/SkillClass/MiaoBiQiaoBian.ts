import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_miao_bi_qiao_bian_a_toc, skill_miao_bi_qiao_bian_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

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

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    const showCardsWindow = gameData.gameObject.showCardsWindow;

    let hasMessage = false;

    for (let player of gameData.playerList) {
      if (player.messageCounts.total > 0) {
        hasMessage = true;
        break;
      }
    }

    if (hasMessage) {
      tooltip.setText("是否使用【妙笔巧辩】？");
    } else {
      tooltip.setText("场上没有情报，不能使用【妙笔巧辩】");
    }

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText("请选择一个角色");
          tooltip.buttons.setButtons([]);
          gameData.gameObject.startSelectPlayer({
            num: 1,
            filter: (player) => player.messageCounts.total > 0,
            onSelect: (player: Player) => {
              gameData.gameObject.selectedPlayers.lock();
              showCardsWindow.show({
                title: "请选择第一张情报",
                limit: 1,
                cardList: player.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_A_TOS, {
                        targetPlayerId: player.id,
                        cardId: showCardsWindow.selectedCards.list[0].id,
                        seq: gameData.gameObject.seq,
                      });
                      gameData.gameObject.selectedPlayers.unlock();
                      gameData.gameObject.clearSelectedPlayers();
                      gameData.gameObject.stopSelectPlayer();
                      showCardsWindow.hide();
                    },
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      showCardsWindow.hide();
                      gameData.gameObject.selectedPlayers.unlock();
                    },
                  },
                ],
              });
            },
          });
        },
        enabled: hasMessage,
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

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cardId, waitingSecond, seq }: skill_miao_bi_qiao_bian_a_toc
  ) {
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
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });
    }

    if (playerId === 0 && gameData.gameObject) {
      const tooltip = gameData.gameObject.tooltip;
      const showCardsWindow = gameData.gameObject.showCardsWindow;

      this.gameObject?.lock();

      tooltip.setText("是否选择第二张牌？");
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            tooltip.setText("请选择一个角色");
            tooltip.buttons.setButtons([]);
            gameData.gameObject.startSelectPlayer({
              num: 1,
              filter: (player) => player.messageCounts.total > 0,
              onSelect: (player: Player) => {
                gameData.gameObject.selectedPlayers.lock();
                showCardsWindow.show({
                  title: "请选择第二张情报",
                  limit: 1,
                  cardList: player.getMessagesCopy(),
                  buttons: [
                    {
                      text: "确定",
                      onclick: () => {
                        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_B_TOS, {
                          enable: true,
                          targetPlayerId: player.id,
                          cardId: showCardsWindow.selectedCards.list[0].id,
                          seq,
                        });
                        gameData.gameObject.selectedPlayers.unlock();
                        gameData.gameObject.clearSelectedPlayers();
                        gameData.gameObject.stopSelectPlayer();
                        showCardsWindow.hide();
                      },
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
                    {
                      text: "取消",
                      onclick: () => {
                        showCardsWindow.hide();
                        gameData.gameObject.selectedPlayers.unlock();
                      },
                    },
                  ],
                });
              },
            });
          },
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_BI_QIAO_BIAN_B_TOS, {
              enable: false,
              seq,
            });
          },
        },
      ]);
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【妙笔巧辩】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }情报区中的${gameLog.formatCard(message)}加入手牌`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_miao_bi_qiao_bian_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }

    const message = targetPlayer.removeMessage(cardId);
    gameData.playerAddHandCard(player, message);
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }情报区中的${gameLog.formatCard(message)}加入手牌`
      )
    );
  }
}
