import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { skill_lian_min_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { CardColor } from "../../Card/type";
import { CardActionLocation } from "../../../Manager/type";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

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

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`你传出的非黑色情报被接收，是否使用【怜悯】？`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next();
              },
            },
            {
              text: "取消",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          num: 1,
          filter: (player) => {
            return (
              (player.id === 0 || player.id === gui.data.messagePlayerId) && player.messageCounts[CardColor.BLACK] > 0
            );
          },
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          enabled: () =>
            showCardsWindow.selectedCards.list[0] &&
            Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_LIAN_MIN_TOS, {
          targetPlayerId: data[1].playerId,
          cardId: data[0].message.id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, cardId, targetPlayerId }: skill_lian_min_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;
    const message = targetPlayer.removeMessage(cardId);
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    gameData.playerAddHandCard(player, message);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: message,
      from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
          message
        )}加入手牌`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
