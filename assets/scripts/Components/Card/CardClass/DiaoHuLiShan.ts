import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GamePhase } from "../../../Manager/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameLog } from "../../GameLog/GameLog";

export class DiaoHuLiShan extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  get description() {
    return "出牌阶段，指定一名角色并选择一项：<br/>♦该角色本回合所有技能无效。<br/>♦该角色本回合不能使用手牌。";
  }

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "调虎离山",
      type: CardType.DIAO_HU_LI_SHAN,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      entity: option.entity,
    });
  }

  onPlay(gui: GameManager): void {
    PlayerAction.switchToGroup("PlayCard")
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          tooltipText: "请选择调虎离山的目标",
          num: 1,
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
      })
      .addStep({
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            const tooltip = gui.tooltip;
            tooltip.setText("请选择一项");
            tooltip.buttons.setButtons([
              {
                text: "无效技能",
                onclick: () => {
                  next({ isSkill: true });
                },
              },
              {
                text: "禁止出牌",
                onclick: () => {
                  next({ isSkill: false });
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
        NetworkEventCenter.emit(NetworkEventToS.USE_DIAO_HU_LI_SHAN_TOS, {
          cardId: this.id,
          targetPlayerId: data[1].players[0].id,
          isSkill: data[0].isSkill,
          seq: gui.seq,
        });
      });
  }

  onEffect(gameData: GameData, { targetPlayerId, isSkill }: CardOnEffectParams) {
    const gameLog = gameData.gameLog;
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (isSkill) {
      targetPlayer.banSkills();
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}本回合技能无效。`));
    } else {
      if (targetPlayerId === 0) {
        targetPlayer.banAllCards();
      }
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}本回合不能使用卡牌。`));
    }
  }

  copy() {
    return new DiaoHuLiShan({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
    });
  }
}
