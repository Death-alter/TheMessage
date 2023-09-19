import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { skill_ji_song_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";

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
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一名角色");
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => player.id !== gui.data.messagePlayerId,
      onSelect: (player) => {
        const showCardsWindow = gui.showCardsWindow;
        gui.gameLayer.pauseSelectPlayers();
        tooltip.setText("请选择一项");
        tooltip.buttons.setButtons([
          {
            text: "弃置手牌",
            onclick: () => {
              tooltip.setText(`请选择两张手牌弃置`);
              gui.gameLayer.startSelectHandCards({
                num: 2,
              });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
                      cardIds: gui.selectedHandCards.list.map((card) => card.id),
                      targetPlayerId: player.id,
                      seq: gui.seq,
                    });
                  },
                  enabled: () => gui.selectedHandCards.list.length === 2,
                },
              ]);
            },
            enabled: () => gui.data.selfPlayer.handCardCount > 1,
          },
          {
            text: "弃置情报",
            onclick: () => {
              showCardsWindow.show({
                title: "请选择一张非黑色情报弃置",
                limit: 1,
                cardList: gui.data.selfPlayer.getMessagesCopy(),
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_SONG_TOS, {
                        messageCard: showCardsWindow.selectedCards.list[0].id,
                        targetPlayerId: player.id,
                        seq: gui.seq,
                      });
                      showCardsWindow.hide();
                    },
                    enabled: () =>
                      showCardsWindow.selectedCards.list.length &&
                      !Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                  },
                ],
              });
            },
            enabled: () => gui.data.selfPlayer.messageCounts[CardColor.BLACK] < gui.data.selfPlayer.messageCounts.total,
          },
        ]);
      },
    });
  }

  onEffect(gameData: GameData, { playerId, messageCard, targetPlayerId }: skill_ji_song_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });


    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【急送】`));

    if (messageCard) {
      const message = player.removeMessage(messageCard.cardId);
      GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player, messageList: [message] });
      new GameLog(`${gameLog.formatPlayer(player)}弃置情报${gameLog.formatCard(message)}`);
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
