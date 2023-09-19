import { skill_shou_kou_ru_ping_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class ShouKouRuPing extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "守口如瓶",
      character,
      description:
        "你使用【试探】或【威逼】后，或被【试探】或【威逼】指定为目标后，这张【试探】或【威逼】无效，然后双方各摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_SHOU_KOU_RU_PING_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SHOU_KOU_RU_PING_TOC);
  }

  onEffect(
    gameData: GameData,
    { playerId, cardPlayerId, cardTargetPlayerId, card, cardType, unknownCardCount }: skill_shou_kou_ru_ping_toc
  ) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【守口如瓶】`));

    const data: any = {
      userId: cardPlayerId != null ? cardPlayerId : playerId,
      cardType,
      targetPlayerId: cardPlayerId != null ? playerId : cardTargetPlayerId,
      isActual: (card && card.cardId > 0) || unknownCardCount > 0,
    };
    if (unknownCardCount > 0) {
      data.cardId = 0;
    } else {
      data.card = card;
    }

    ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, data);
    const cardText = gameLog.formatCard(
      unknownCardCount > 0 ? gameData.createCard(card) : gameData.createCardByType(<number>cardType)
    );

    if (cardPlayerId) {
      const cardPlayer = gameData.playerList[cardPlayerId];
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(cardPlayer)}使用的${cardText}无效`));
    } else {
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用的${cardText}无效`));
    }
  }
}
