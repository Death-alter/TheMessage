import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { card, skill_sou_ji_a_toc, skill_sou_ji_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

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

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_SOU_JI_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
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

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (playerId === 0) {
      const message = gameData.createMessage(messageCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();

      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseBlackCards",
        params: {
          cards: cards.map((card) => gameData.createCard(card)),
          message: gameData.createCard(messageCard),
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【搜缉】`));
    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}查看${gameLog.formatPlayer(targetPlayer)}的手牌和待收情报`)
    );
  }

  promptChooseBlackCards(gui: GameManager, params) {
    const { cards, message } = params;
    const showCardsWindow = gui.showCardsWindow;

    const cardList = [...cards, message];
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
              seq: gui.seq,
            };
            for (let card of showCardsWindow.selectedCards.list) {
              if (card.id === message.id) {
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

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, messageCard }: skill_sou_ji_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const cardList = cards.map((card) => gameData.createCard(card));
    const tags = cards.map(() => "手牌");
    const handCards = gameData.playerRemoveHandCard(targetPlayer, cards);
    gameData.playerAddHandCard(player, handCards);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: handCards,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });

    if (messageCard) {
      gameData.playerAddHandCard(player, gameData.messageInTransmit);
      cardList.push(gameData.createCard(messageCard));
      tags.push("情报");

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        card: gameData.messageInTransmit,
        player,
      });
      gameData.messageInTransmit = null;
    }

    if (playerId !== 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showCards",
        params: {
          cardList,
          tags,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${cardList.length}张牌加入手牌`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }

  showCards(gui: GameManager, params) {
    const { cardList, tags } = params;
    const showCardsWindow = gui.showCardsWindow;
    showCardsWindow.show({
      title: "展示【搜缉】拿走的牌",
      limit: 0,
      cardList,
      tags,
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
}
