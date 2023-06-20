import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Player } from "../../Player/Player";
import { skill_huan_ri_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../GameLog/GameLog";

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
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【换日】`));
  }
}
