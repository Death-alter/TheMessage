import { skill_yi_ya_huan_ya_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";

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

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你接收了黑色情报，是否使用【以牙还牙】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张黑色手牌和一名玩家`);
          const selectedHandCards = gameData.gameObject.selectedHandCards;
          const neighbors = gameData.getPlayerNeighbors(gameData.senderId);
          gameData.gameObject.startSelectHandCard({
            num: 1,
          });
          gameData.gameObject.startSelectPlayer({
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
                  targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () => {
                return (
                  selectedHandCards.list.length &&
                  selectedHandCards.list[0].color.indexOf(CardColor.BLACK) !== -1 &&
                  gameData.gameObject.selectedPlayers.list.length !== 0
                );
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
          gameData.gameObject.stopSelectPlayer();
          gameData.gameObject.clearSelectedPlayers();
          gameData.gameObject.stopSelectHandCard();
          gameData.gameObject.clearSelectedHandCards();
        },
        enabled: (() => {
          for (let card of gameData.gameObject.handCardList.list) {
            if (card.color.indexOf(CardColor.BLACK) !== -1) {
              return true;
            }
          }
          return false;
        })(),
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_yi_ya_huan_ya_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;
    let handCard = player.removeHandCard(card.cardId);
    if (!handCard) {
      player.removeHandCard(0);
      handCard = gameData.createCard(card);
    }
    targetPlayer.addMessage(handCard);
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【以牙还牙】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}将手牌${gameLog.formatCard(handCard)}置入【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的情报区`
      )
    );

    if (playerId === 0) {
      gameData.gameObject.handCardList.removeData(handCard);
    }
    gameData.gameObject.cardAction.messagePlacedIntoMessageZone({ player: targetPlayer, message: handCard });
  }
}
