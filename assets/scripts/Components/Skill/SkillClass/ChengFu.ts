import { skill_cheng_fu_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { CardType } from "../../Card/type";
import { Character } from "../../../Components/Chatacter/Character";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { PassiveSkill } from "../../../Components/Skill/Skill";

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
    const data: any = {
      userId: fromPlayerId,
      cardType: unknownCardCount > 0 ? CardType.SHI_TAN : CardType.WEI_BI,
      targetPlayerId: playerId,
      isActual: (card && card.cardId > 0) || unknownCardCount > 0,
    };
    if (unknownCardCount > 0) {
      data.cardId = 0;
    } else {
      data.card = card;
    }

    ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, data);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[fromPlayerId];
    const cardOnPlay = unknownCardCount > 0 ? gameData.createCardByType(CardType.SHI_TAN) : gameData.createCard(card);
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用的${gameLog.formatCard(cardOnPlay)}无效`));
  }
}
