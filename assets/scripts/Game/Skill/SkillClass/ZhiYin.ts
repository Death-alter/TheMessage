import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_zhi_yin_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class ZhiYin extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "知音",
      character,
      description: "你接收红色或蓝色情报后，你和传出者各摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZHI_YIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHI_YIN_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_zhi_yin_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【知音】`));
  }
}
