import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_ru_bi_zhi_shi_a_toc, skill_ru_bi_zhi_shi_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Character/type";
import { CardColor, CardType } from "../../Card/type";
import { Card } from "../../Card/Card";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { TagName } from "../../../type";

export class RuBiZhiShi extends ActiveSkill {
  private dyingPlayerId: number;

  constructor(character: Character) {
    super({
      name: "如臂指使",
      character,
      description:
        "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，查看一名角色的手牌，然后可以从中选择一张弃置，或选择一张符合使用时机的牌，由该角色使用（若如【误导】等需要做出选择的，则由你选择）。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_RU_BI_ZHI_SHI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_RU_BI_ZHI_SHI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this,
    );

    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_RU_BI_ZHI_SHI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_RU_BI_ZHI_SHI_B_TOC);
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  onPlayerDying(data) {
    this.dyingPlayerId = data.diePlayerId;
    if (this.entity) {
      this.entity.useable = true;
      UIEventCenter.once(UIEvent.STOP_COUNT_DOWN, () => {
        this.entity.useable = false;
      });
    }
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择要查看手牌的角色",
        filter: (player: Player) => player.handCardCount > 0,
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_A_TOS, {
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, cards, waitingSecond, seq }: skill_ru_bi_zhi_shi_a_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}查看${gameLog.formatPlayer(targetPlayer)}的手牌`));

    if (playerId === 0) {
      const handCards = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseCard",
        params: {
          handCards,
          targetPlayer,
        },
      });
    }
  }

  promptChooseCard(gui: GameManager, params: { handCards: Card[]; targetPlayer: Player }) {
    const { handCards, targetPlayer } = params;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next }) => {
          showCardsWindow.show({
            title: "请选择一张手牌",
            limit: 1,
            cardList: handCards,
            buttons: [
              {
                text: "弃置",
                onclick: () => {
                  const cardId = showCardsWindow.selectedCards.list[0].id;
                  PlayerAction.onComplete(() => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_B_TOS, {
                      enable: true,
                      cardId,
                      useCard: false,
                      seq: gui.seq,
                    });
                  });
                  showCardsWindow.hide();
                  next({ useCard: false });
                },
                enabled: () => showCardsWindow.selectedCards.list.length > 0,
              },
              {
                text: "使用",
                onclick: () => {
                  const card = showCardsWindow.selectedCards.list[0];
                  showCardsWindow.hide();
                  next({ card, useCard: true });
                },
                enabled: () => {
                  if (showCardsWindow.selectedCards.list.length === 0) return false;
                  let card = showCardsWindow.selectedCards.list[0];
                  const data = targetPlayer.getTagData(TagName.CARD_NAME_REPLACED);
                  if (data && data.cardTypeA === card.type) {
                    card = gui.data.createCardWithNewType(card, data.cardTypeB);
                  }
                  const bannedCardTypes = targetPlayer.getTagData(TagName.CARD_BANNED);
                  const banned =
                    targetPlayer.hasTag(TagName.ALL_CARD_BANNED) ||
                    (bannedCardTypes && bannedCardTypes.indexOf(card.type) !== -1);
                  if (card.availablePhases.indexOf(gui.data.gamePhase) === -1 || banned) return false;
                  return gui.uiLayer.cardCanPlayed(card).canPlay;
                },
              },
              {
                text: "取消",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_B_TOS, {
                    enable: false,
                    seq: gui.seq,
                  });
                  showCardsWindow.hide();
                },
              },
            ],
          });
        },
      }),
    })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev, end }) => {
            const { card, useCard } = current;
            if (useCard) {
              if (card.type === CardType.CHENG_QING) {
                const player = gui.data.playerList[this.dyingPlayerId];
                showCardsWindow.show({
                  title: "选择一张情报弃置",
                  cardList: player.getMessagesCopy(),
                  limit: 1,
                  buttons: [
                    {
                      text: "确定",
                      onclick: () => {
                        const targetCardId = showCardsWindow.selectedCards.list[0].id;
                        PlayerAction.onComplete(() => {
                          NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
                            use: true,
                            cardId: card.id,
                            targetCardId,
                            seq: gui.seq,
                          });
                        });
                        showCardsWindow.hide();
                        next();
                      },
                      enabled: () =>
                        showCardsWindow.selectedCards.list.length > 0 &&
                        Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                    },
                  ],
                });
              } else {
                showCardsWindow.hide();
                card.onPlay(gui);
                next();
              }
            } else {
              next();
            }
          },
        }),
      })
      .start();
  }

  onEffectB(gameData: GameData, { enable, useCard, playerId, targetPlayerId }: skill_ru_bi_zhi_shi_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (enable) {
      if (useCard) {
        gameLog.addData(
          new GameLog(`${gameLog.formatPlayer(player)}选择使用${gameLog.formatPlayer(targetPlayer)}的手牌`),
        );
      } else {
        gameLog.addData(
          new GameLog(`${gameLog.formatPlayer(player)}选择弃置${gameLog.formatPlayer(targetPlayer)}的手牌`),
        );
      }
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
