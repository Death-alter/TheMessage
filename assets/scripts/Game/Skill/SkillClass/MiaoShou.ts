import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_miao_shou_a_toc, skill_miao_shou_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

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

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("请选择一名角色");
    gameData.gameObject.startSelectPlayer({
      num: 1,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_A_TOS, {
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
    { playerId, targetPlayerId, cards, waitingSecond, seq, messageCard }: skill_miao_shou_a_toc
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

    const message = gameData.createMessage(messageCard);
    message.gameObject = gameData.messageInTransmit.gameObject;
    gameData.messageInTransmit = null;
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.discardMessage(message);
    }

    if (playerId === 0 && gameData.gameObject) {
      this.gameObject?.lock();
      const data: any = {
        seq,
      };

      const tooltip = gameData.gameObject.tooltip;
      const showCardsWindow = gameData.gameObject.showCardsWindow;
      const cardList = [...cards.map((card) => gameData.createCard(card)), ...targetPlayer.getMessagesCopy()];
      showCardsWindow.show({
        title: "请选择一张牌作为待收情报",
        limit: 1,
        cardList,
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
              showCardsWindow.hide();
            },
            enabled: () => !!showCardsWindow.selectedCards.list.length,
          },
        ],
      });

      tooltip.setText("请选择一名角色");
      gameData.gameObject.startSelectPlayer({
        num: 1,
        onSelect: (player) => {
          data.targetPlayerId = player.id;
          NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_B_TOS, data);
        },
      });
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【妙手】`));
    gameLog.addData(
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}弃置了待收情报${gameLog.formatCard(message)}`)
    );
  }

  onEffectB(
    gameData: GameData,
    { playerId, fromPlayerId, targetPlayerId, card, messageCardId }: skill_miao_shou_b_toc
  ) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const fromPlayer = gameData.playerList[fromPlayerId];

    let message;
    if (card) {
      if (fromPlayerId === 0) {
        message = fromPlayer.removeHandCard(card.cardId);
        gameData.gameObject.handCardList.removeData(message);
      } else {
        fromPlayer.removeHandCard(0);
        message = gameData.createCard(card);
      }
    } else {
      message = fromPlayer.removeMessage(messageCardId);
    }

    gameData.messageInTransmit = message;
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.moveCard({
        card: message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
        to: { location: CardActionLocation.PLAYER, player: targetPlayer },
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把${gameLog.formatCard(message)}移至【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}面前`
      )
    );

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
  }
}
