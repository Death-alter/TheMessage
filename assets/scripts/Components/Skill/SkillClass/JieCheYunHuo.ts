import { CardType } from "../../Card/type";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameEvent } from "../../../Event/type";
import { GameEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";

export class JieCheYunHuo extends PassiveSkill {
  banWuDao: (data) => void;

  constructor(character: Character) {
    super({
      name: "借车运货",
      character,
      description: "你传出的情报不能被其他角色误导。",
    });
  }

  init(gameData: GameData, player) {
    this.banWuDao = (data) => {
      const id = player.id;
      const sender = data.player;
      if (sender.id === id) {
        for (const player of gameData.playerList) {
          if (player.id !== id) player.banCardByType(CardType.WU_DAO);
        }
      }
    };
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.banWuDao, this);
  }

  dispose() {
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.banWuDao, this);
  }
}
