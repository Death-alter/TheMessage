import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { TagName } from "../../../type";

export class QiangYingXiaLing extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "强硬下令",
      character,
      description: "你传出的情报均可以锁定。",
    });
  }

  init(gameData: GameData, player: Player) {
    player.addTag(TagName.MESSAGE_CAN_LOCK);
  }

  dispose() {}
}
