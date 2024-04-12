import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Character/Character";
import { skill_ming_er_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../../Components/Player/Player";

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
