import { skill_shou_kou_ru_ping_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, ProcessEvent } from "../../../Event/type";
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
        "你对其他角色使用【试探】或【威逼】后，或被其他角色的【试探】或【威逼】指定为目标后，这张【试探】或【威逼】无效。如果这是本回合首次触发此技能，双方各摸一张牌，否则你摸一张牌。",
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
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const data: any = {
      userId: cardPlayerId,
      cardType,
      targetPlayerId: cardTargetPlayerId,
      isActual: (card && card.cardId > 0) || unknownCardCount > 0,
    };
    if (unknownCardCount > 0) {
      data.cardId = 0;
    } else {
      data.card = card;
    }

    ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, data);
    const cardText = gameLog.formatCard(card ? gameData.createCard(card) : gameData.createCardByType(<number>cardType));

    if (cardPlayerId) {
      const cardPlayer = gameData.playerList[cardPlayerId];
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(cardPlayer)}使用的${cardText}无效`));
    } else {
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用的${cardText}无效`));
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
