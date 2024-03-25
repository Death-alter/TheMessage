import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";
import { skill_han_hou_lao_shi_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../GameLog/GameLog";
import { CardActionLocation } from "../../../Manager/type";

export class HanHouLaoShi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "憨厚老实",
      character,
      description: "当你传出的情报被其他角色接收后，接收者抽取你的一张手牌。",
    });
  }

  init(gameData: GameData, player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HAN_HOU_LAO_SHI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HAN_HOU_LAO_SHI_TOC);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card }: skill_han_hou_lao_shi_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const handCard = gameData.playerRemoveHandCard(player, card);
    gameData.playerAddHandCard(targetPlayer, handCard);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player: targetPlayer,
      card: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(targetPlayer)}抽取了${gameLog.formatPlayer(player)}的${
          card ? gameLog.formatCard(handCard) : "一张手牌"
        }`,
      ),
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
