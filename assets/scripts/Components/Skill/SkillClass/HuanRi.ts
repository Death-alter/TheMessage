import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../../Components/Player/Player";
import { skill_huan_ri_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../../Components/GameLog/GameLog";

export class HuanRi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "换日",
      character,
      description: "你使用【调包】或【破译】后，可以将你的角色牌翻至面朝下。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HUAN_RI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HUAN_RI_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_huan_ri_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【换日】`));
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
