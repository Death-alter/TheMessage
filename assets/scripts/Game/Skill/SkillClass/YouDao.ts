import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_ming_er_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class YouDao extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "诱导",
      character,
      description: "你使用【误导】后，摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YOU_DAO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YOU_DAO_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_ming_er_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【诱导】`));
  }
}
