import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { skill_zhi_yin_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
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
