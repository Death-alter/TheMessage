import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GamePhase } from "../../../GameManager/type";
import { skill_ji_song_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";

export class JiSong extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "急送",
      character,
      description:
        "争夺阶段限一次，你可以弃置两张手牌，或从你的情报区弃置一张非黑色情报，然后将待收情报移至一名角色面前。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JI_SONG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JI_SONG_TOC);
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("请选择一名角色");
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== gameData.messagePlayerId,
      onSelect: (player) => {
        const showCardsWindow = gameData.gameObject.showCardsWindow;
        gameData.gameObject.stopSelectPlayer();
        tooltip.setText("请选择一项");
        tooltip.buttons.setButtons([
          {
            text: "弃置手牌",
            onclick: () => {
              tooltip.setText(`请选择两张手牌弃置`);
              gameData.gameObject.startSelectHandCard({
                num: 2,
              });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
                      cardIds: gameData.gameObject.selectedHandCards.list.map((card) => card.id),
                      targetPlayerId: player.id,
                      seq: gameData.gameObject.seq,
                    });
                  },
                  enabled: () => gameData.gameObject.selectedHandCards.list.length === 2,
                },
              ]);
            },
            enabled: () => gameData.selfPlayer.handCardCount > 1,
          },
          {
            text: "弃置情报",
            onclick: () => {
              showCardsWindow.show({
                title: "请选择一张非黑色情报弃置",
                limit: 1,
                cardList: gameData.selfPlayer.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
                        messageCard: showCardsWindow.selectedCards.list[0].id,
                        targetPlayerId: player.id,
                        seq: gameData.gameObject.seq,
                      });
                      showCardsWindow.hide();
                    },
                    enabled: () =>
                      showCardsWindow.selectedCards.list.length &&
                      Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                  },
                ],
              });
            },
            enabled: () => gameData.selfPlayer.messageCounts[CardColor.BLACK] < gameData.selfPlayer.messageCounts.total,
          },
        ]);
      },
    });
  }

  onEffect(gameData: GameData, { playerId, messageCard, targetPlayerId }: skill_ji_song_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【急送】`));

    if (messageCard) {
      const message = player.removeMessage(messageCard.cardId);
      gameData.gameObject.cardAction.removeMessage({ player, messageList: [message] });
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}弃置情报${gameLog.formatCard(message)}`);
    }

    gameData.gameObject.cardAction.transmitMessage({
      messagePlayer: targetPlayer,
      message: gameData.messageInTransmit,
    });

    ++this.usageCount;

    if (playerId === 0) {
      this.gameObject.isOn = false;
    }
  }
}
