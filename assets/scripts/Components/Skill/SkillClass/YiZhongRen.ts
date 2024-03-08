import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";

export class YiZhongRen extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "意中人",
      character,
      description: "只要“韩梅”在场且存活，摸牌阶段你多摸一张牌，若“韩梅”拥有三张或更多红色情报且未宣胜，你与她一同胜利。",
    });
  }

  init(gameData: GameData, player: Player) {}

  dispose() {}
}
