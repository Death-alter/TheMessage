import { skill_hou_zi_qie_xin_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Card } from "../../Card/Card";
import { GameLog } from "../../GameLog/GameLog";

export class HouZiQieXin extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount < 2;
  }

  constructor(character: Character) {
    super({
      name: "猴子窃信",
      character,
      description: "出牌阶段限两次，你可以用一张手牌与其他角色情报区中的完全同色的情报互换。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HOU_ZI_QIE_XIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HOU_ZI_QIE_XIN_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const showCardsWindow = gui.showCardsWindow;
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        num: 1,
        enabled: () => gui.selectedPlayers.list.length > 0,
      },
      resolver: (data) => {
        return { playerId: data.players[0].id };
      },
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          title: "请选择一张情报",
          enabled: () => showCardsWindow.selectedCards.list.length > 0,
        },
      })
      .addStep({
        step: PlayerActionStepName.SELECT_HAND_CARDS,
        data: {
          tooltipText: "请选择一张手牌",
          filter: (card: Card, current) => {
            const { playerId }: { playerId: number } = current;
            const player = gui.data.playerList[playerId];
            const messages = player.getMessagesCopy();
            for (let message of messages) {
              if (message.color.length === card.color.length) {
                return message.color.every((color, index) => (color = card.color[index]));
              }
            }
            return false;
          },
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_HOU_ZI_QIE_XIN_TOS, {
          handCardId: data[0].cardId,
          targetPlayerId: data[2].playerId,
          messageCardId: data[1].cardId,
          seq: gui.seq,
        });
      });
  }

  onEffect(gameData: GameData, { playerId, handCard, targetPlayerId, messageCardId }: skill_hou_zi_qie_xin_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const card = gameData.playerRemoveHandCard(player, handCard);
    const message = targetPlayer.removeMessage(messageCardId);
    gameData.playerAddHandCard(player, message);
    targetPlayer.addMessage(card);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: card,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: player },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(card)}和${gameLog.formatPlayer(
          targetPlayer
        )}的情报${gameLog.formatCard(message)}互换`
      )
    );

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
