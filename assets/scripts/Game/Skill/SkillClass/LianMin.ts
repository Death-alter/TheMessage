import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_lian_min_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { CardActionLocation } from "../../../GameManager/type";
import { Card } from "../../Card/Card";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

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

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你传出的非黑色情报被接收，是否使用【怜悯】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一名角色`);
          gui.startSelectPlayer({
            num: 1,
            filter: (player) => {
              return (
                (player.id === 0 || player.id === gui.data.messagePlayerId) && player.messageCounts[CardColor.BLACK] > 0
              );
            },
            onSelect: (player) => {
              const showCardsWindow = gui.showCardsWindow;
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
                        seq: gui.seq,
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
                      gui.clearSelectedPlayers();
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
                  seq: gui.seq,
                });
                gui.stopSelectPlayer();
                gui.clearSelectedPlayers();
              },
            },
          ]);
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId }: skill_lian_min_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;
    const message = targetPlayer.removeMessage(cardId);
    gameData.playerAddHandCard(player, message);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【怜悯】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
          message
        )}加入手牌`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
