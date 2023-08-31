import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_tou_tian_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";

export class JiZhi extends ActiveSkill {
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
      ProcessEventCenter.once(ProcessEvent.STOP_COUNT_DOWN, () => {
        this.gameObject.useable = false;
      });
    }
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_JI_ZHI_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { playerId }: skill_tou_tian_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【急智】`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
