import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_lian_min_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { CardActionLocation } from "../../../GameManager/type";
import { Card } from "../../Card/Card";

export class LianMin extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "怜悯",
      character,
      description: "你传出的非黑色情报被接收后，可以从你或接收者的情报区中选择一张黑色情报加入你的手牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_LIAN_MIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_LIAN_MIN_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你传出的非黑色情报被接收，是否使用【怜悯】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一名角色`);
          gameData.gameObject.startSelectPlayer({
            num: 1,
            filter: (player) => {
              return (
                (player.id === 0 || player.id === gameData.messagePlayerId) && player.messageCounts[CardColor.BLACK] > 0
              );
            },
            onSelect: (player) => {
              const showCardsWindow = gameData.gameObject.showCardsWindow;
              showCardsWindow.show({
                title: "请选择一张情报",
                limit: 1,
                cardList: player.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_LIAN_MIN_TOS, {
                        targetPlayerId: player.id,
                        cardId: showCardsWindow.selectedCards.list[0].id,
                        seq: gameData.gameObject.seq,
                      });
                    },
                    enabled: () =>
                      showCardsWindow.selectedCards.list[0] &&
                      Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      showCardsWindow.hide();
                      gameData.gameObject.clearSelectedPlayers();
                      tooltip.setText(`请选择一名角色`);
                    },
                  },
                ],
              });
            },
          });
          tooltip.buttons.setButtons([
            {
              text: "取消",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
                  seq: gameData.gameObject.seq,
                });
                gameData.gameObject.stopSelectPlayer();
                gameData.gameObject.clearSelectedPlayers();
              },
            },
          ]);
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

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId }: skill_lian_min_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;
    const message = targetPlayer.removeMessage(cardId);
    player.addHandCard(message);
    gameData.gameObject.cardAction.addCardToHandCard({
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【怜悯】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }的情报${gameLog.formatCard(message)}加入手牌`
      )
    );
  }
}
