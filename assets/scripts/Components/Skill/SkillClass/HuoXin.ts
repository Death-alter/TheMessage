import { skill_huo_xin_a_toc, skill_huo_xin_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class HuoXin extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "惑心",
      character,
      description:
        "出牌阶段限一次，展示牌堆顶的一张牌，然后查看一名角色的手牌，从中选择一张弃置，若弃置了含有展示牌颜色的牌，则将该弃置牌加入你的手牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HUO_XIN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HUO_XIN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HUO_XIN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_HUO_XIN_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择要查看手牌的角色",
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_HUO_XIN_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, showCard, cards, waitingSecond, seq }: skill_huo_xin_a_toc
  ) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const topCard = gameData.createCard(showCard);

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    gameLog.addData(new GameLog(`【惑心】展示牌堆顶的牌${gameLog.formatCard(topCard)}`));
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}查看${gameLog.formatPlayer(targetPlayer)}的手牌`));

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      const handCards = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectCard",
        params: {
          topCard,
          handCards,
        },
      });
    } else {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showTopCard",
        params: {
          topCard,
        },
      });
    }
  }

  promptSelectCard(gui: GameManager, params) {
    const { topCard, handCards } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "请选择一张手牌弃置",
      limit: 1,
      cardList: [topCard, ...handCards],
      tags: ["牌堆顶", ...handCards.map(() => "手牌")],
      buttons: [
        {
          text: "确定",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_HUO_XIN_B_TOS, {
              discardCardId: showCardsWindow.selectedCards.list[0].id,
              seq: gui.seq,
            });
            showCardsWindow.hide();
          },
          enabled: () =>
            showCardsWindow.selectedCards.list.length > 0 && showCardsWindow.selectedCards.list[0] !== topCard,
        },
      ],
    });
  }

  showTopCard(gui: GameManager, params) {
    const { topCard } = params;
    const showCardsWindow = gui.showCardsWindow;
    showCardsWindow.show({
      title: "【惑心】展示牌堆顶的牌",
      limit: 0,
      cardList: [topCard],
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

  onEffectB(gameData: GameData, { playerId, targetPlayerId, discardCard, joinIntoHand }: skill_huo_xin_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (joinIntoHand) {
      const card = gameData.playerRemoveHandCard(targetPlayer, discardCard);
      gameData.playerAddHandCard(player, card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: card,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的${gameLog.formatCard(card)}加入手牌`
        )
      );
    } else {
      ProcessEventCenter.emit(ProcessEvent.DISCARD_CARDS, {
        playerId: targetPlayerId,
        cards: [discardCard],
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}弃置${gameLog.formatPlayer(targetPlayer)}的手牌${gameLog.formatCard(
            gameData.createCard(discardCard)
          )}`
        )
      );
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
