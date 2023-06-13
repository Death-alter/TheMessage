import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jing_meng_a_toc, skill_jing_meng_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class JingMeng extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "惊梦",
      character,
      description: "你接收黑色情报后，可以查看一名角色的手牌，然后从中选择一张弃置。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JING_MENG_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JING_MENG_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JING_MENG_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JING_MENG_B_TOC);
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`你接收了黑色情报，是否使用【惊梦】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一名角色查看手牌`);
          gameData.gameObject.startSelectPlayer({
            num: 1,
            filter: (player) => {
              return player.id !== 0;
            },
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JING_MENG_A_TOS, {
                  targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                  seq: gameData.gameObject.seq,
                });
              },
              enabled: () => !!gameData.gameObject.selectedPlayers.list.length,
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
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, cards, targetPlayerId, waitingSecond, seq }: skill_jing_meng_a_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HNADLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      const cardList = cards.map((card) => gameData.createCard(card));
      gameData.gameObject.showCardsWindow.show({
        title: "请选择一张手牌弃置",
        limit: 1,
        cardList,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_JING_MENG_B_TOS, {
                cardId: gameData.gameObject.showCardsWindow.selectedCards.list[0].id,
                seq: seq,
              });
              gameData.gameObject.showCardsWindow.hide();
            },
          },
        ],
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}使用技能【惊梦】，查看【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的手牌`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId }: skill_jing_meng_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameObject.gameLog;

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}从【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }手中选择一张牌弃置`
      )
    );
  }
}
