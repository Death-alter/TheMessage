import { skill_zhen_li_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Character } from "../../Chatacter/Character";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class ZhenLi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "真理",
      character,
      description: "你传出的红色或蓝色情报被其他角色接收后，你可以摸两张牌，将此角色牌翻至面朝下。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZHEN_LI_tOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHEN_LI_tOC);
  }

  onEffect(gameData: GameData, { playerId }: skill_zhen_li_toc) {
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
