import { skill_guan_hai_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { CardStatus } from "../../Card/type";
import { Character } from "../../Chatacter/Character";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class GuanHai extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "观海",
      character,
      description: "你使用【截获】或【误导】时，在结算前先查看待收情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GUAN_HAI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_GUAN_HAI_TOC);
  }

  onEffect(gameData: GameData, { playerId, card }: skill_guan_hai_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (playerId === 0) {
      const message = gameData.createMessage(card);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.status = CardStatus.FACE_UP;
      message.gameObject?.flip().then(() => {
        message.gameObject.scheduleOnce(() => {
          message.status = CardStatus.FACE_DOWN;
          message.gameObject?.flip();
        }, 1);
      });
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
