import { skill_pin_ming_san_lang_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Card } from "../../Card/Card";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";

export class PinMingSanLang extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "拼命三郎",
      character,
      description:
        "出牌阶段限一次，你可以将一张纯黑色手牌置入自己的情报区，然后摸三张牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_PIN_MING_SAN_LANG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_PIN_MING_SAN_LANG_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张纯黑色手牌置入你的情报区",
        num: 1,
        filter: (card: Card) => {
          if (card.color.length === 1 && card.color[0] === CardColor.BLACK) {
            return CardUsableStatus.USABLE;
          } else {
            return CardUsableStatus.UNUSABLE;
          }
        },
        enabled: () => gui.selectedHandCards.list.length > 0,
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_PIN_MING_SAN_LANG_TOS, {
        cardId: data[0].cards[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { playerId, card }: skill_pin_ming_san_lang_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const handCard = gameData.playerRemoveHandCard(player, card);
    player.addMessage(handCard);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player,
      message: handCard,
      from: {
        location: CardActionLocation.PLAYER_HAND_CARD,
        player,
      },
    });

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入自己的情报区`)
    );

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
