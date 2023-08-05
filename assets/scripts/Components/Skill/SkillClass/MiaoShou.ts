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
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一名角色");
    gui.gameLayer.startSelectPlayers({
      num: 1,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_A_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => !!gui.selectedPlayers.list.length,
      },
      {
        text: "取消",
        onclick: () => {
          gui.uiLayer.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cards, waitingSecond, seq, messageCard }: skill_miao_shou_a_toc
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

    const message = gameData.createMessage(messageCard);
    gameData.messageInTransmit = message;
    message.gameObject = gameData.messageInTransmit.gameObject;

    GameEventCenter.emit(GameEvent.MESSAGE_REMOVED, message);

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

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【妙手】`));
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}弃置了待收情报${gameLog.formatCard(message)}`));
  }

  promptSelectCard(gui: GameManager, params) {
    const { cards, messages } = params;

    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;
    const cardList = [...cards, ...messages];
    const tags = cards.map(() => "手牌");
    messages.forEach(() => {
      tags.push("情报区");
    });
    const data: any = {
      seq: gui.seq,
    };

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
              data.cardId = selectedCard.id;
            } else {
              data.messageCardId = selectedCard.id;
            }
            gui.showCardsWindow.hide();
          },
          enabled: () => !!showCardsWindow.selectedCards.list.length,
        },
      ],
    });

    tooltip.setText("请选择一名角色");
    gui.gameLayer.startSelectPlayers({
      num: 1,
      onSelect: (player) => {
        data.targetPlayerId = player.id;
        NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_B_TOS, data);
        gui.gameLayer.stopSelectPlayers();
      },
    });
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

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
