import { CardType } from "../../Card/type";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEvent, UIEvent } from "../../../Event/type";
import { GameEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";

export class JieCheYunHuo extends PassiveSkill {
  banWuDao: (data) => void;

  constructor(character: Character) {
    super({
      name: "借车运货",
      character,
      description: "你传出的情报不能被误导。",
    });
  }

  init(gameData: GameData, player) {
    this.banWuDao = (data) => {
      const sender = data.player;
      if (sender.id === player.id) {
        for (const player of gameData.playerList) {
          player.banCardByType(CardType.WU_DAO);
        }
      }
    };
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.banWuDao, this);
  }

  dispose() {
    GameEventCenter.off(GameEvent.PLAYER_SEND_MESSAGE, this.banWuDao, this);
  }
}
