import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";

export class BaiYueGuang extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "白月光",
      character,
      description: "只要“小九”在场且存活，摸牌阶段你多摸一张牌，若“小九”拥有三张或更多蓝色情报且未宣胜，你与他一同胜利。",
    });
  }

  init(gameData: GameData, player: Player) {}

  dispose() {}
}
