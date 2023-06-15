import { skill_jian_ren_a_toc, skill_jian_ren_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { CardActionLocation, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";

export class JianRen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "坚韧",
      character,
      description:
        "你接收黑色情报后，可以展示牌堆顶的一张牌，若是黑色牌，则将展示的牌加入你的手牌，并从一名角色的情报区弃置一张黑色情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_REN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_REN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_B_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你接收了黑色情报,是否使用【坚韧】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_REN_A_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_jian_ren_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;
    const showCardsWindow = gameData.gameObject.showCardsWindow;
    showCardsWindow.show({
      title: "展示牌堆顶的牌",
      limit: 0,
      cardList: [gameData.createCard(card)],
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            showCardsWindow.hide();
          },
        },
      ],
    });

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【坚韧】`));

    const handCard = gameData.createCard(card);
    if (handCard.color.indexOf(CardColor.BLACK) !== -1) {
      player.addHandCard(handCard);

      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        card: handCard,
        from: { location: CardActionLocation.DECK },
      });

      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}把展示的牌${gameLog.formatCard(handCard)}加入手牌`
        )
      );
    }

    if (waitingSecond > 0) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0) {
        const tooltip = gameData.gameObject.tooltip;
        tooltip.setText("请选择一名角色弃置一张黑色情报");
        gameData.gameObject.startSelectPlayer({
          num: 1,
          filter: (player) => player.messageCounts.black > 0,
          onSelect: (player) => {
            showCardsWindow.show({
              title: "请选择一张黑色情报弃置",
              limit: 1,
              cardList: player.getMessagesCopy(),
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_REN_B_TOS, {
                      targetPlayerId: player.id,
                      cardId: showCardsWindow.selectedCards.list[0].id,
                      seq,
                    });
                    showCardsWindow.hide();
                  },
                  enabled: () =>
                    showCardsWindow.selectedCards.list.length &&
                    showCardsWindow.selectedCards.list[0].color.indexOf(CardColor.BLACK) !== -1,
                },
                {
                  text: "取消",
                  onclick: () => {
                    gameData.gameObject.clearSelectedPlayers();
                    showCardsWindow.hide();
                  },
                },
              ],
            });
          },
        });
      }
    }
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_jian_ren_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;

    const message = targetPlayer.removeMessage(cardId);
    gameData.gameObject.cardAction.removeMessage({ player: targetPlayer, messageList: [message] });

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}从【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }的情报区弃置${gameLog.formatCard(message)}`
      )
    );
  }
}
