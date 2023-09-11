import { skill_shou_kou_ru_ping_toc, skill_wait_for_shou_kou_ru_ping_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { WaitingType } from "../../../Manager/type";
import { CardType } from "../../Card/type";

export class ShouKouRuPing extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "守口如瓶",
      character,
      description:
        "你被【试探】或【威逼】指定为目标后，或你死亡前，你可以摸一张牌，然后你可以交给其他角色一张手牌，那张【试探】或【威逼】无效。若此角色牌未翻开，则先翻开此角色牌。",
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
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_SHOU_KOU_RU_PING_TOC,
      (data) => {
        this.waitingForUse(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_SHOU_KOU_RU_PING_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_SHOU_KOU_RU_PING_TOC);
  }

  waitingForUse(
    gameData: GameData,
    { playerId, isUseCard, fromPlayerId, cardType, card, waitingSecond, seq }: skill_wait_for_shou_kou_ru_ping_toc
  ) {
    if (isUseCard) {
      const data: any = {
        userId: fromPlayerId,
        cardType,
        card,
        targetPlayerId: playerId,
        isActual: card && card.cardId > 0,
      };

      ProcessEventCenter.emit(ProcessEvent.CARD_PLAYED, data);
    }

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptGiveCard",
      });
    }
  }

  promptGiveCard(gui: GameManager, params): void {
    const tooltip = gui.tooltip;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          tooltip.setText(`是否把一张手牌交给其他角色？`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next();
              },
            },
            {
              text: "取消",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    })
      .addStep({
        step: PlayerActionStepName.SELECT_HAND_CARDS,
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player) => player.id !== 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_SHOU_KOU_RU_PING_TOS, {
          enable: true,
          targetPlayerId: data[0].players[0].id,
          cardId: data[1].cards[0].id,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_SHOU_KOU_RU_PING_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(
    gameData: GameData,
    { playerId, enable, targetPlayerId, giveCard, isUseCard, fromPlayerId, card }: skill_shou_kou_ru_ping_toc
  ) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【守口如瓶】`));

    if (enable) {
      const targetPlayer = gameData.playerList[targetPlayerId];
      const handCard = gameData.playerRemoveHandCard(player, giveCard);
      gameData.playerAddHandCard(targetPlayer, handCard);
      GameEventCenter.emit(GameEvent.PLAYER_GIVE_CARD, { player, targetPlayer, cardList: [handCard] });

      if (isUseCard) {
        const fromPlayer = gameData.playerList[fromPlayerId];
        gameLog.addData(
          new GameLog(
            `${gameLog.formatPlayer(fromPlayer)}使用的${gameLog.formatCard(
              card ? gameData.createCard(card) : gameData.createCardByType(CardType.SHI_TAN)
            )}无效`
          )
        );
      }
    }
  }
}
