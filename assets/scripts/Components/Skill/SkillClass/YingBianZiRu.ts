import { skill_ying_bian_zi_ru_a_toc, skill_ying_bian_zi_ru_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Character/Character";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { CharacterStatus } from "../../Character/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { GameLog } from "../../GameLog/GameLog";
import { CardStatus } from "../../Card/type";

export class YingBianZiRu extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "应变自如",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后将待收情报翻开，根据其颜色执行操作：\n♦红或蓝单色：视为对其使用了【截获】，摸一张牌。\n♦黑单色：视为对其使用了【误导】，摸两张牌。\n♦双色：弃置该情报，结束争夺阶段，摸三张牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YING_BIAN_ZI_RU_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YING_BIAN_ZI_RU_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YING_BIAN_ZI_RU_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_YING_BIAN_ZI_RU_B_TOC);
  }

  canUse(gui: GameManager) {
    return gui.data.messageInTransmit.status === CardStatus.FACE_DOWN;
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_YING_BIAN_ZI_RU_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  async onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_ying_bian_zi_ru_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const message = gameData.createMessage(card);
    gameData.messageInTransmit = message;
    message.status = CardStatus.FACE_UP;
    GameEventCenter.emit(GameEvent.MESSAGE_TURNED_OVER, { message });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}翻开待收情报${gameLog.formatCard(message)}`));

    if (message.color.length > 1) {
      GameEventCenter.emit(GameEvent.MESSAGE_REMOVED, message);
    }

    if (waitingSecond > 0) {
      UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
        playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "chooseTarget",
        });
      }
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }

  chooseTarget(gui: GameManager) {
    const neighbors = gui.data.getPlayerNeighbors(gui.data.messagePlayerId);
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择误导的目标",
        num: 1,
        filter: (player) => {
          return neighbors.indexOf(player) !== -1;
        },
        enabled: () => gui.selectedPlayers.list.length > 0,
        canCancel: false,
      },
    })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_YING_BIAN_ZI_RU_B_TOS, {
          targetPlayerId: data[0].players[0].id,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId }: skill_ying_bian_zi_ru_b_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
