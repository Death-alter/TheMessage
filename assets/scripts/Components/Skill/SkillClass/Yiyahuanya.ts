import { skill_yi_ya_huan_ya_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { TriggerSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { CardActionLocation } from "../../../Manager/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class YiYaHuanYa extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "以牙还牙",
      character,
      description: "你接收黑色情报后，可以将一张黑色手牌置入情报传出者或其相邻角色的情报区，然后摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_YA_HUAN_YA_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_YA_HUAN_YA_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`你接收了黑色情报，是否使用【以牙还牙】？`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next();
              },
              enabled: Card.hasColor(gui.data.handCardList.list, CardColor.BLACK),
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
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            tooltip.setText(`请选择一张黑色手牌和一名玩家`);
            const selectedHandCards = gui.selectedHandCards;
            const neighbors = gui.data.getPlayerNeighbors(gui.data.senderId);
            gui.gameLayer.startSelectHandCards({
              num: 1,
            });
            gui.gameLayer.startSelectPlayers({
              num: 1,
              filter: (player) => {
                return neighbors.indexOf(player) !== -1 || player.id === gui.data.senderId;
              },
            });
            tooltip.buttons.setButtons([
              {
                text: "确定",
                onclick: () => {
                  next({
                    cardId: selectedHandCards.list[0].id,
                    targetPlayerId: gui.selectedPlayers.list[0].id,
                  });
                },
                enabled: () => {
                  return (
                    selectedHandCards.list.length &&
                    Card.hasColor(selectedHandCards.list[0], CardColor.BLACK) &&
                    gui.selectedPlayers.list.length !== 0
                  );
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
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_YA_HUAN_YA_TOS, {
          cardId: data[0].cardId,
          targetPlayerId: data[0].targetPlayerId,
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

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_yi_ya_huan_ya_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const handCard = gameData.playerRemoveHandCard(player, card);
    targetPlayer.addMessage(handCard);

    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
    
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
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
