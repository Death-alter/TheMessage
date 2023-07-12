import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_tou_tian_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class JiZhi extends ActiveSkill {
  private dyingPlayerId: number = -1;

  constructor(character: Character) {
    super({
      name: "急智",
      character,
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JI_ZHI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JI_ZHI_TOC);
    NetworkEventCenter.off(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  onPlayerDying(data) {
    if (this.gameObject) {
      this.gameObject.useable = true;
      this.dyingPlayerId = data.diePlayerId;
      ProcessEventCenter.once(ProcessEvent.STOP_COUNT_DOWN, () => {
        this.gameObject.useable = false;
      });
    }
  }

  onUse(gui: GameUI) {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用【急智】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_ZHI_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          if (gui.data.gamePhase === GamePhase.FIGHT_PHASE) {
            gui.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
          } else {
            gui.promptUseChengQing("玩家濒死，是否使用澄清？", this.dyingPlayerId);
          }
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId }: skill_tou_tian_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【急智】`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
