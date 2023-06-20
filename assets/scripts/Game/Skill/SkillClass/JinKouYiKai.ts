import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jin_kou_yi_kai_a_toc, skill_jin_kou_yi_kai_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import GamePools from "../../../GameManager/GamePools";
import { Player } from "../../Player/Player";
import { Card } from "../../Card/Card";

export class JinKouYiKai extends ActiveSkill {
  private usageCount: number = 0;
  private isSelfTurn: boolean = false;
  private topCard: Card;

  get useable() {
    return this.usageCount === 0 && this.isSelfTurn;
  }

  constructor(character: Character) {
    super({
      name: "金口一开",
      character,
      description:
        "你的争夺阶段限一次，你可以查看牌堆顶的一张牌，然后选择一项：\n♦你摸一张牌\n♦将牌堆顶的一张牌和待收情报面朝下互换。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC);
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
    GameEventCenter.off(GameEvent.GAME_TURN_CHANGE, this.onTurnChange, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onTurnChange({ turnPlayer }) {
    this.isSelfTurn = turnPlayer.id === 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`是否使用【金口一开】`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_A_TOS, {
            seq: gameData.gameObject.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_jin_kou_yi_kai_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0 && gameData.gameObject) {
      this.gameObject?.lock();
      const tooltip = gameData.gameObject.tooltip;

      this.topCard = gameData.createCard(card);
      if (gameData.gameObject) {
        gameData.gameObject.cardAction.showDeckTopCard(this.topCard);
      }

      tooltip.setText(`请选择一项`);
      tooltip.buttons.setButtons([
        {
          text: "摸一张牌",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_B_TOS, {
              exchange: false,
              seq,
            });
          },
        },
        {
          text: "交换情报",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_B_TOS, {
              exchange: true,
              seq,
            });
          },
        },
      ]);
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【金口一开】`));
  }

  onEffectB(gameData: GameData, { playerId, exchange }: skill_jin_kou_yi_kai_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    if (exchange) {
      if (playerId === 0) {
        if (gameData.gameObject) {
          gameData.gameObject.cardAction.replaceMessage({
            message: this.topCard,
            oldMessage: gameData.messageInTransmit,
          });
        }
      } else {
        const card = gameData.createCard();
        if (gameData.gameObject) {
          gameData.gameObject.cardAction.showDeckTopCard(card);
          gameData.gameObject.cardAction.replaceMessage({
            message: card,
            oldMessage: gameData.messageInTransmit,
          });
        }
      }

      gameLog.addData(
        new GameLog(`【${player.seatNumber + 1}号】${player.character.name}选择将牌堆顶的牌和待收情报互换`)
      );
    } else {
      if (playerId === 0) {
        GamePools.cardPool.put(this.topCard.gameObject);
        this.topCard = null;
      }
      gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}选择摸一张牌`));
    }

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
    ++this.usageCount;
  }
}
