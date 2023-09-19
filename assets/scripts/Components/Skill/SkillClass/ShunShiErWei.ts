import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { skill_shun_shi_er_wei_toc } from "../../../../protobuf/proto";

export class ShunShiErWei extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "顺势而为",
      character,
      description: "你使用【截获】或成为【截获】的目标时，可以将此角色牌翻至面朝下。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SHUN_SHI_ER_WEI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SHUN_SHI_ER_WEI_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_shun_shi_er_wei_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【顺势而为】`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
