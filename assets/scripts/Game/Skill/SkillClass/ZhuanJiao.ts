import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_zhuan_jiao_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS } from "../../../Event/type";
import { WaitingType, CardActionLocation } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";

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
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHUAN_JIAO_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_ZHUAN_JIAO_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    const showCardsWindow = gameData.gameObject.showCardsWindow;

    tooltip.setText(`你使用了一张手牌,是否使用【转交】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          showCardsWindow.show({
            title: "请选择一张非黑色情报",
            limit: 1,
            cardList: gameData.selfPlayer.getMessagesCopy(),
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const selectedMessage = showCardsWindow.selectedCards.list[0];
                  showCardsWindow.hide();
                  tooltip.setText("请选择一名角色");
                  gameData.gameObject.startSelectPlayer({
                    num: 1,
                    filter: (player) => {
                      if (player.id === 0) return false;
                      player.messageCounts[selectedMessage.color[0]];
                    },
                    onSelect: (player) => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_ZHUAN_JIAO_TOS, {
                        enable: true,
                        cardId: selectedMessage.id,
                        targetPlayerId: player.id,
                        seq: gameData.gameObject.seq,
                      });
                    },
                  });
                },
                enabled: () =>
                  showCardsWindow.selectedCards.list.length &&
                  Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
              },
            ],
          });
        },
        enabled: gameData.selfPlayer.messageCounts.total > 0,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_ZHUAN_JIAO_TOS, {
            enable: false,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId }: skill_zhuan_jiao_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const message = player.removeMessage(cardId);
    targetPlayer.addMessage(message);
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToMessageZone({
        player: targetPlayer,
        card: message,
        from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: player },
      });
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【转交】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}把情报${gameLog.formatCard(message)}置入【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的情报区`
      )
    );
  }
}
