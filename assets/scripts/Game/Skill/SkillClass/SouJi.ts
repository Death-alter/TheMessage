import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { card, skill_sou_ji_a_toc, skill_sou_ji_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

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

  onUse(gui: GameUI) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一名角色");
    gui.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_SOU_JI_A_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => !!gui.selectedPlayers.list.length,
      },
      {
        text: "取消",
        onclick: () => {
          gui.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cards, messageCard, waitingSecond, seq }: skill_sou_ji_a_toc
  ) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

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

  promptChooseBlackCards(gui: GameUI, params) {
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
    const handCards = gameData.playerRemoveHandCard(
      targetPlayer,
      cards.map((card: card) => card.cardId)
    );
    gameData.playerAddHandCard(player, handCards);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: handCards,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });

    if (messageCard) {
      gameData.playerAddHandCard(player, gameData.messageInTransmit);
      const message = gameData.createCard(messageCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = null;
      cardList.push(message);

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        card: message,
        player,
      });
    }

    if (playerId !== 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showCards",
        params: {
          cardList,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${cardList.length}张牌加入手牌`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }

  showCards(gui: GameUI, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;
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
  }
}
