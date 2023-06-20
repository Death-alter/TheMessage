import { skill_fu_hei_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Character } from "../../Character/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class FuHei extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "腹黑",
      character,
      description: "你传出的黑色情报被接收后，你摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_FU_HEI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_FU_HEI_TOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_fu_hei_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【腹黑】`));
  }
}
