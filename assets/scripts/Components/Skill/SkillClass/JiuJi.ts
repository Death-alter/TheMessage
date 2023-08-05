import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_jiu_ji_a_toc, skill_jiu_ji_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";

export class JiuJi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "就计",
      character,
      description:
        "你被【试探】【威逼】或【利诱】指定为目标后，可以翻开此角色牌，然后摸两张牌，并在触发此技能的卡牌结算后，将其加入你的手牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIU_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIU_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIU_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIU_JI_B_TOC);
  }

  onEffectA(gameData: GameData, { playerId }: skill_jiu_ji_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【就计】`));
  }

  onEffectB(gameData: GameData, { playerId, card, unknownCardCount }: skill_jiu_ji_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    if (!card && unknownCardCount === 0) return;

    const cardOnPlay = gameData.cardOnPlay;
    gameData.cardOnPlay = null;
    gameData.playerAddHandCard(player, cardOnPlay);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: cardOnPlay,
    });

    GameEventCenter.emit(GameEvent.AFTER_PLAYER_PLAY_CARD, { card: cardOnPlay, flag: false });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${gameLog.formatCard(cardOnPlay)}加入手牌`));
  }
}
