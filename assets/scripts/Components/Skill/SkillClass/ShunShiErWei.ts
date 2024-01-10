import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { skill_shun_shi_er_wei_toc } from "../../../../protobuf/proto";

export class ShunShiErWei extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "顺势而为",
      character,
      description: "你使用的【截获】或以你面前的情报被【截获】后，可以将此角色牌翻至面朝下，摸一张牌。",
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

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
