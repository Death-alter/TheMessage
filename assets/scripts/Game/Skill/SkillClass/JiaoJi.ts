import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jiao_ji_a_toc, skill_jiao_ji_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";

export class JiaoJi extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "交际",
      character,
      description:
        "出牌阶段限一次，你可以抽取一名角色的最多两张手牌，然后将等量的手牌交给该角色。你每收集一张黑色情报，便可以少交一张手牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAO_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAO_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAO_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAO_JI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`请选择一名角色`);
    gameData.gameObject.startSelectPlayer({
      num: 1,
    });

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAO_JI_A_TOS, {
            targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => {
          return !!gameData.gameObject.selectedPlayers.list.length;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, cards, unknownCardCount, waitingSecond, seq }: skill_jiao_ji_a_toc
  ) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const handCards = gameData.playerRemoveHandCard(
      targetPlayer,
      unknownCardCount ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
    );
    gameData.playerAddHandCard(player, handCards);

    if (gameData.gameObject) {
      for (let card of handCards) {
        gameData.handCardList.removeData(card);
      }

      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      if (playerId === 0) {
        const tooltip = gameData.gameObject.tooltip;
        this.gameObject?.lock();
        let num = handCards.length;
        if (player.messageCounts[CardColor.BLACK] === 0) {
          tooltip.setText(`请选择${num}张手牌交给该角色`);
        } else {
          num = handCards.length - player.messageCounts[CardColor.BLACK];
          tooltip.setText(`请选择${num > 0 ? num : 0} - ${handCards.length}张手牌交给该角色`);
        }
        gameData.gameObject.startSelectHandCard({
          num: handCards.length,
        });
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAO_JI_B_TOS, {
                cardIds: gameData.gameObject.selectedHandCards.list.map((card) => card.id),
                seq,
              });
            },
            enabled: () => gameData.gameObject.selectedHandCards.list.length >= num,
          },
        ]);
      }
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【交际】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}抽取了【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }${handCards.length}张手牌`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cards, unknownCardCount }: skill_jiao_ji_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const handCards = gameData.playerRemoveHandCard(
      player,
      unknownCardCount ? new Array(unknownCardCount).fill(0) : cards.map((card) => card)
    );
    gameData.playerAddHandCard(targetPlayer, handCards);

    if (gameData.gameObject) {
      for (let card of handCards) {
        gameData.handCardList.removeData(card);
      }
      gameData.gameObject.cardAction.addCardToHandCard({
        player: targetPlayer,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}交给了【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }${handCards.length}张手牌`
      )
    );

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
    ++this.usageCount;
  }
}
