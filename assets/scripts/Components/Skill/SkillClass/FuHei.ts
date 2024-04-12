import { skill_fu_hei_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Character } from "../../Character/Character";
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
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
