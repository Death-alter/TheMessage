import { skill_guan_hai_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
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
    const gameLog = gameData.gameLog;

    if (playerId === 0) {
      const message = gameData.createMessage(card);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【观海】，查看待收情报`));
  }
}
