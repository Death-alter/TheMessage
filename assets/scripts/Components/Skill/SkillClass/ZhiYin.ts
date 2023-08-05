import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_zhi_yin_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";

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
