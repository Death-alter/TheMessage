import { skill_cheng_fu_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardType } from "../../Card/type";
import { Character } from "../../Character/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class ChengFu extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "城府",
      character,
      description: "【试探】和【威逼】对你无效。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CHENG_FU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CHENG_FU_TOC);
  }

  onEffect(gameData: GameData, { playerId, fromPlayerId, card, unknownCardCount }: skill_cheng_fu_toc) {
    ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, {
      userId: fromPlayerId,
      card: unknownCardCount > 0 ? null : card,
      cardType: unknownCardCount > 0 ? CardType.SHI_TAN : CardType.WEI_BI,
      targetPlayerId: playerId,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[fromPlayerId];
    const cardOnPlay = gameData.createCard(card);
    gameLog.addData(
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用的${gameLog.formatCard(cardOnPlay)}无效`)
    );
  }
}
