import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_zhuan_jiao_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS, GameEvent } from "../../../Event/type";
import { WaitingType, CardActionLocation } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";

export class ZhuanJiao extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "转交",
      character,
      description:
        "你使用一张手牌后，可以从你的情报区选择一张非黑色情报，将其置入另一名角色的情报区，然后你摸两张牌。你不能通过此技能让任何角色收集三张或更多同色情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZHUAN_JIAO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHUAN_JIAO_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    tooltip.setText(`你使用了一张手牌,是否使用【转交】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          showCardsWindow.show({
            title: "请选择一张非黑色情报",
            limit: 1,
            cardList: gui.data.selfPlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const selectedMessage = showCardsWindow.selectedCards.list[0];
                  showCardsWindow.hide();
                  tooltip.setText("请选择一名角色");
                  gui.gameLayer.startSelectPlayers({
                    num: 1,
                    filter: (player) => {
                      if (player.id === 0) return false;
                      return player.sameMessageCountOver(selectedMessage);
                    },
                    onSelect: (player) => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_ZHUAN_JIAO_TOS, {
                        enable: true,
                        cardId: selectedMessage.id,
                        targetPlayerId: player.id,
                        seq: gui.seq,
                      });
                    },
                  });
                },
                enabled: () =>
                  showCardsWindow.selectedCards.list.length &&
                  !Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
              },
            ],
          });
        },
        enabled: gui.data.selfPlayer.messageCounts.total > 0,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_ZHUAN_JIAO_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId }: skill_zhuan_jiao_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const message = player.removeMessage(cardId);
    targetPlayer.addMessage(message);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: player },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把情报${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
          targetPlayer
        )}的情报区`
      )
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
