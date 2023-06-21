import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_sou_ji_a_toc, skill_sou_ji_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";

export class SouJi extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "搜缉",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后查看一名角色的手牌和待收情报，并且你可以选择其中任意张黑色牌，展示并加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SOU_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SOU_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SOU_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_SOU_JI_B_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("请选择一名角色");
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_SOU_JI_A_TOS, {
            targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => !!gameData.gameObject.selectedPlayers.list.length,
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
    { playerId, targetPlayerId, cards, messageCard, waitingSecond, seq }: skill_sou_ji_a_toc
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

    if (playerId === 0 && gameData.gameObject) {
      this.gameObject?.lock();

      const showCardsWindow = gameData.gameObject.showCardsWindow;
      const message = gameData.createMessage(messageCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();

      const cardList = [...cards.map((card) => gameData.createCard(card)), gameData.createCard(messageCard)];
      showCardsWindow.show({
        title: "请选择任意张黑色牌加入手牌",
        limit: cardList.length,
        cardList,
        tags: cardList.map((card, index) => {
          if (index === cardList.length - 1) {
            return "待收情报";
          } else {
            return "手牌";
          }
        }),
        buttons: [
          {
            text: "确定",
            onclick: () => {
              const data: any = {
                cardIds: [],
                messageCard: false,
                seq,
              };
              for (let card of showCardsWindow.selectedCards.list) {
                if (card.id === messageCard.cardId) {
                  data.messageCard = true;
                } else {
                  data.cardIds.push(card.id);
                }
              }

              NetworkEventCenter.emit(NetworkEventToS.SKILL_SOU_JI_B_TOS, data);
              showCardsWindow.hide();
            },
            enabled: () => {
              for (let card of showCardsWindow.selectedCards.list) {
                if (!Card.hasColor(card, CardColor.BLACK)) {
                  return false;
                }
              }
              return true;
            },
          },
        ],
      });
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【搜缉】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}查看【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }的手牌和待收情报`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, messageCard }: skill_sou_ji_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const showCardsWindow = gameData.gameObject.showCardsWindow;

    let handCards: Card[];
    if (targetPlayerId === 0) {
      handCards = targetPlayer.removeHandCard(cards.map((card) => card.cardId));
    } else {
      targetPlayer.removeHandCard(new Array(cards.length).fill(0));
      handCards = cards.map((card) => gameData.createCard(card));
    }
    player.addHandCard(handCards);

    if (messageCard) {
      player.addHandCard(gameData.messageInTransmit);
    }

    if (gameData.gameObject) {
      if (targetPlayerId === 0) {
        for (let card of handCards) {
          gameData.gameObject.handCardList.removeData(card);
        }
      }

      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      const cardList = cards.map((card) => gameData.createCard(card));
      if (messageCard) {
        const message = gameData.createCard(messageCard);
        message.gameObject = gameData.messageInTransmit.gameObject;
        gameData.messageInTransmit = null;
        if (gameData.gameObject) {
          gameData.gameObject.cardAction.addCardToHandCard({
            card: message,
            player,
          });
        }
        cardList.push(message);
      }

      if (playerId !== 0) {
        showCardsWindow.show({
          title: "展示【搜缉】拿走的牌",
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
        this.gameObject?.unlock();
        this.gameObject.isOn = false;
      }

      gameLog.addData(
        new GameLog(`【${player.seatNumber + 1}号】${player.character.name}把${cardList.length}张牌加入手牌`)
      );
    }
  }
}
