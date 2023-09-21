import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_cong_rong_ying_dui_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent, NetworkEventToS, GameEvent } from "../../../Event/type";
import { WaitingType, CardActionLocation } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class CongRongYingDui extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "从容应对",
      character,
      description:
        "你对一名角色使用的【试探】结算后，或一名角色对你使用的【试探】结算后，你可以抽取该角色的一张手牌，或令你和该角色各摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CONG_RONG_YING_DUI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_SKILL_CONG_RONG_YING_DUI_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CONG_RONG_YING_DUI_TOC);
    NetworkEventCenter.off(NetworkEventToC.WAIT_FOR_SKILL_CONG_RONG_YING_DUI_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText("【试探】已结算，是否使用【从容应对】");
          tooltip.buttons.setButtons([
            {
              text: "是",
              onclick: () => {
                next();
              },
            },
            {
              text: "否",
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
            tooltip.setText("请选择一项操作");
            tooltip.buttons.setButtons([
              {
                text: "抽取对方的手牌",
                onclick: () => {
                  next({ drawCard: false });
                },
              },
              {
                text: "双方各摸一张牌",
                onclick: () => {
                  next({ drawCard: true });
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
        NetworkEventCenter.emit(NetworkEventToS.SKILL_CONG_RONG_YING_DUI_TOS, {
          enable: true,
          drawCard: data[0].drawCard,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_CONG_RONG_YING_DUI_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card, enable, drawCard }: skill_cong_rong_ying_dui_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameLog;

      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
        player,
        skill: this,
      });

      if (!drawCard) {
        const handCard = gameData.playerRemoveHandCard(targetPlayer, card);
        gameData.playerAddHandCard(player, handCard);
        GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
          player: player,
          card: handCard,
          from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
        });

        gameLog.addData(
          new GameLog(`${gameLog.formatPlayer(player)}抽取${gameLog.formatPlayer(targetPlayer)}的一张手牌`)
        );
      }

      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }
}
