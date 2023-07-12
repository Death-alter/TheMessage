import { skill_yi_ya_huan_ya_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { Card } from "../../Card/Card";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

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

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了黑色情报，是否使用【以牙还牙】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张黑色手牌和一名玩家`);
          const selectedHandCards = gui.selectedHandCards;
          const neighbors = gui.data.getPlayerNeighbors(gui.data.senderId);
          gui.startSelectHandCard({
            num: 1,
          });
          gui.startSelectPlayer({
            num: 1,
            filter: (player) => {
              return neighbors.indexOf(player) !== -1 || player.id === 0;
            },
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_YA_HUAN_YA_TOS, {
                  cardId: selectedHandCards.list[0].id,
                  targetPlayerId: gui.selectedPlayers.list[0].id,
                  seq: gui.seq,
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
          ]);
        },
        enabled: Card.hasColor(gui.data.handCardList.list, CardColor.BLACK),
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
          gui.stopSelectPlayer();
          gui.clearSelectedPlayers();
          gui.stopSelectHandCard();
          gui.clearSelectedHandCards();
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_yi_ya_huan_ya_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const handCard = gameData.playerRemoveHandCard(player, card);
    targetPlayer.addMessage(handCard);

    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, { player: targetPlayer, message: handCard });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【以牙还牙】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
          targetPlayer
        )}的情报区`
      )
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
