import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { skill_shen_cang_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../GameLog/GameLog";

export class ShenCang extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "深藏",
      character,
      description: "你使用【威逼】、【风云变幻】或【截获】后，可以将此角色牌翻至面朝下。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SHEN_CANG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SHEN_CANG_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_shen_cang_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【深藏】`));
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
