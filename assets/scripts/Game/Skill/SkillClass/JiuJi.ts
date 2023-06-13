import { PassiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jiu_ji_a_toc, skill_jiu_ji_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

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
    const gameLog = gameData.gameObject.gameLog;

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【就计】`));
  }

  onEffectB(gameData: GameData, { playerId, card, unknownCardCount }: skill_jiu_ji_b_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameObject.gameLog;
    const cardOnPlay = unknownCardCount > 0 ? gameData.createCardByType(card.cardType) : gameData.createCard(card);
    if (!cardOnPlay) {
      return;
    }
    cardOnPlay.gameObject = gameData.cardOnPlay.gameObject;
    gameData.cardOnPlay = null;
    player.addHandCard(cardOnPlay);
    gameData.gameObject.cardAction.addCardToHandCard({
      player,
      card: cardOnPlay,
    });

    GameEventCenter.emit(GameEvent.AFTER_PLAYER_PLAY_CARD, { card: cardOnPlay, flag: false });

    gameLog.addData(
      new GameLog(`【${player.seatNumber + 1}号】${player.character.name}把${gameLog.formatCard(cardOnPlay)}加入手牌`)
    );
  }
}
