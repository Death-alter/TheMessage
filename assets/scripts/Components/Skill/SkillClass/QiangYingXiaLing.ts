import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { TagName } from "../../../type";

export class QiangYingXiaLing extends PassiveSkill {
  doSendMessage: Function;

  constructor(character: Character) {
    super({
      name: "强硬下令",
      character,
      description: "传出的情报均可以锁定。",
    });
  }

  init(gameData: GameData, player: Player) {
    player.addTag(TagName.SKILL_BANNED);
  }

  dispose() {}
}
