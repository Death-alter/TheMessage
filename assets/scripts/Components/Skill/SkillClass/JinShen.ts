import { skill_jin_shen_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { TriggerSkill } from "../../../Components/Skill/Skill";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { Character } from "../../../Components/Character/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class JinShen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "谨慎",
      character,
      description: "你接收双色情报后，可以用一张手牌与该情报面朝上互换。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_SHEN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_SHEN_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`你接收了双色情报，是否使用【谨慎】？`);
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
        step: PlayerActionStepName.SELECT_HAND_CARDS,
        data: {
          tooltipText: "请选择一张手牌与接收的情报互换",
          num: 1,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_SHEN_TOS, {
          cardId: data[0].cards[0].id,
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

  onEffect(gameData: GameData, { playerId, card, messageCardId }: skill_jin_shen_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    const handCard = gameData.playerRemoveHandCard(player, card);
    const message = player.removeMessage(messageCardId);

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    gameData.playerAddHandCard(player, message);
    if (playerId === 0) {
      gameData.handCardList.addData(message);
    }
    player.addMessage(handCard);

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}和情报${gameLog.formatCard(message)}互换`,
      ),
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
