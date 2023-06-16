import { skill_du_ji_a_toc, skill_jin_kou_yi_kai_a_toc, skill_jin_kou_yi_kai_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import GamePools from "../../../GameManager/GamePools";
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Character } from "../../Character/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class DuJi extends ActiveSkill {
  private usageCount: number = 0;
  private isSelfTurn: boolean = false;

  get useable() {
    return this.usageCount === 0 && this.isSelfTurn;
  }

  constructor(character: Character) {
    super({
      name: "毒计",
      character,
      description:
        "你的争夺阶段限一次，你可以翻开此角色牌，然后指定两名其他角色，令他们互相抽取对方的一张手牌并展示之，你将展示的牌加入你的手牌，若展示的是黑色牌，你可以改为令抽取者选择一项：<br/>♦将其置入自己的情报区。<br/>♦将其置入对方的情报区。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_C_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_C_TOC);
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount);
    GameEventCenter.off(GameEvent.GAME_TURN_CHANGE, this.onTurnChange);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onTurnChange({ turnPlayer }) {
    this.isSelfTurn = turnPlayer.id === 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`是否使用【毒计】`);
    gameData.gameObject.startSelectPlayer({
      num: 2,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_A_TOS, {
            targetPlayerIds: gameData.gameObject.selectedPlayers.list.map((player) => player.id),
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => gameData.gameObject.selectedPlayers.list.length === 2,
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

  onEffectA(gameData: GameData, { playerId, targetPlayerIds, cards }: skill_du_ji_a_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const showCardsWindow = gameData.gameObject.showCardsWindow;
    const cardList = cards.map((card) => gameData.createCard(card));

    if (playerId === 0) {
      this.gameObject?.lock();
      const tooltip = gameData.gameObject.tooltip;

      this.topCard = gameData.createCard(card);
      gameData.gameObject.cardAction.showDeckTopCard(this.topCard);

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
    } else {
      showCardsWindow.show({
        title: "【毒计】展示抽到的手牌",
        limit: 0,
        cardList: cardList,
        buttons: [
          {
            text: "关闭",
            onclick: () => {
              showCardsWindow.hide();
            },
          },
        ],
      });
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【金口一开】`));
  }

  onEffectB(gameData: GameData, { playerId, exchange }: skill_jin_kou_yi_kai_b_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];

    if (exchange) {
      if (playerId === 0) {
        gameData.gameObject.cardAction.replaceMessage({
          message: this.topCard,
          oldMessage: gameData.messageInTransmit,
        });
      } else {
        const card = gameData.createCard();
        gameData.gameObject.cardAction.showDeckTopCard(card);
        gameData.gameObject.cardAction.replaceMessage({
          message: card,
          oldMessage: gameData.messageInTransmit,
        });
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
