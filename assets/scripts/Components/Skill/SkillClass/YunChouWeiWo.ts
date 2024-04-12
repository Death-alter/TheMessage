import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_yun_chou_wei_wo_a_toc, skill_yun_chou_wei_wo_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, UIEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Character/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class YunChouWeiWo extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "运筹帷幄",
      character,
      description:
        "出牌阶段或争夺阶段，你可以翻开此角色牌，然后查看牌堆顶的五张牌，从中选择三张加入手牌，其余的卡牌按任意顺序放回牌堆顶。",
      useablePhase: [GamePhase.MAIN_PHASE, GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YUN_CHOU_WEI_WO_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YUN_CHOU_WEI_WO_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YUN_CHOU_WEI_WO_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_YUN_CHOU_WEI_WO_B_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_YUN_CHOU_WEI_WO_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, cards, waitingSecond, seq }: skill_yun_chou_wei_wo_a_toc) {
    UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (playerId === 0) {
      const cardList = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseCard",
        params: {
          cardList,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}查看牌堆顶的五张牌`));
  }

  promptChooseCard(gui: GameManager, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          showCardsWindow.show({
            title: "请选择三张牌加入手牌",
            limit: 3,
            cardList,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const list = cardList.map((card) => card);
                  for (let i = 0; i < showCardsWindow.selectedCards.list.length; i++) {
                    const index = list.indexOf(showCardsWindow.selectedCards.list[i]);
                    if (index !== -1) {
                      list.splice(index, 1);
                      --i;
                    }
                  }
                  showCardsWindow.hide();
                  next({ cardList: list });
                },
                enabled: () => showCardsWindow.selectedCards.list.length === 3,
              },
            ],
          });
        },
      }),
    })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev }) => {
            const { cardList } = current;
            showCardsWindow.show({
              title: "请选择放在上方的牌",
              limit: 1,
              cardList,
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    if (cardList[0] !== showCardsWindow.selectedCards.list[0]) {
                      cardList.reverse();
                    }
                    const cardIds = cardList.map((card) => card.id);
                    showCardsWindow.hide();
                    next({ cardIds });
                  },
                  enabled: () => showCardsWindow.selectedCards.list.length === 1,
                },
              ],
            });
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_YUN_CHOU_WEI_WO_B_TOS, {
          deckCardIds: data[0].cardIds,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, cards }: skill_yun_chou_wei_wo_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    let cardList;
    if (playerId === 0) {
      cardList = cards.map((card) => gameData.createCard(card));
    } else {
      cardList = [];
      for (let i = 0; i < 3; i++) [cardList.push(gameData.createCard())];
    }

    gameData.playerAddHandCard(player, cardList);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: cardList,
      from: { location: CardActionLocation.DECK },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把三张牌加入手牌，把两张牌放回堆顶`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
