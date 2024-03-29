import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_miao_shou_a_toc, skill_miao_shou_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class MiaoShou extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "妙手",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后弃置待收情报，并查看一名角色的手牌和情报区，从中选择一张牌作为待收情报，面朝上移至一名角色的面前。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_SHOU_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_SHOU_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_SHOU_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_SHOU_B_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        filter: (player: Player) => player.handCardCount + player.messageCounts.total > 0,
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cards, waitingSecond, seq, messageCard }: skill_miao_shou_a_toc
  ) {
    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const message = gameData.createMessage(messageCard);
    gameData.messageInTransmit = message;
    message.gameObject = gameData.messageInTransmit.gameObject;
    GameEventCenter.emit(GameEvent.MESSAGE_REMOVED, message);

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}查看了${gameLog.formatPlayer(targetPlayer)}的手牌情报区情报区`)
    );

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectCard",
        params: {
          messages: targetPlayer.getMessagesCopy(),
          cards: cards.map((card) => gameData.createCard(card)),
        },
      });
    }
  }

  promptSelectCard(gui: GameManager, params) {
    const { cards, messages } = params;

    const showCardsWindow = gui.showCardsWindow;
    const cardList = [...cards, ...messages];
    const tags = cards.map(() => "手牌");
    messages.forEach(() => {
      tags.push("情报区");
    });

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          showCardsWindow.show({
            title: "请选择一张牌作为待收情报",
            limit: 1,
            cardList,
            tags,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const selectedCard = showCardsWindow.selectedCards.list[0];
                  if (cardList.indexOf(selectedCard) < cards.length) {
                    next({ cardId: selectedCard.id });
                  } else {
                    next({ messageCardId: selectedCard.id });
                  }
                  showCardsWindow.hide();
                },
                enabled: () => !!showCardsWindow.selectedCards.list.length,
              },
            ],
          });
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_B_TOS, {
          targetPlayerId: data[0].players[0].id,
          cardId: data[1].cardId,
          messageCardId: data[1].messageCardId,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(
    gameData: GameData,
    { playerId, fromPlayerId, targetPlayerId, card, messageCardId }: skill_miao_shou_b_toc
  ) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const fromPlayer = gameData.playerList[fromPlayerId];
    if (gameData.gameObject) {
      gameData.gameObject.showCardsWindow.hide();
    }

    let message;
    if (card) {
      message = gameData.playerRemoveHandCard(fromPlayer, card);
      if (fromPlayerId !== 0) {
        message = gameData.createCard(card);
      }
    } else {
      message = fromPlayer.removeMessage(messageCardId);
    }

    gameData.messageInTransmit = message;

    GameEventCenter.emit(GameEvent.CARD_MOVED, {
      card: message,
      from: {
        location: card ? CardActionLocation.PLAYER_HAND_CARD : CardActionLocation.PLAYER_MESSAGE_ZONE,
        player: fromPlayer,
      },
      to: { location: CardActionLocation.PLAYER, player: targetPlayer },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatCard(message)}移至${gameLog.formatPlayer(targetPlayer)}面前`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
