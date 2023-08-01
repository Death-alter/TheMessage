import { skill_ming_er_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";

export class MingEr extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "明饵",
      character,
      description: "你传出的红色或蓝色情报被接收后，你和接收者各摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MING_ER_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MING_ER_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_ming_er_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【明饵】`));
  }
}
