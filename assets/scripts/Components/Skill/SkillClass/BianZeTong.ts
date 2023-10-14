import { skill_bian_ze_tong_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { CardType } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { TagName } from "../../../type";

export class BianZeTong extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "变则通",
      character,
      description:
        "传递阶段开始时，摸一张牌，然后你可以宣言以下两种卡牌名称“A”和“B”：【截获】【误导】【调包】【破译】。直到回合结束，所有玩家的“A”当做“B”牌使用，且不能当做“B”以外的牌使用。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_BIAN_ZE_TONG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_BIAN_ZE_TONG_TOC,
      (data) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });

        GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
          player,
          skill: this,
        });
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_BIAN_ZE_TONG_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_BIAN_ZE_TONG_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText("是否宣言卡牌类型？");
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
        step: new PlayerActionStep({
          handler: (data, { next, prev }) => {
            const showCardsWindow = gui.showCardsWindow;
            const cardTypeList = [CardType.JIE_HUO, CardType.WU_DAO, CardType.DIAO_BAO, CardType.PO_YI];
            showCardsWindow.show({
              title: "请选择卡牌种类A",
              cardList: cardTypeList.map((type) => gui.data.createCardByType(type)),
              limit: 1,
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    const type = showCardsWindow.selectedCards.list[0].type;
                    showCardsWindow.hide();
                    gui.gameLayer.pauseSelectPlayers();
                    next({
                      cardType: type,
                    });
                  },
                  enabled: () => !!showCardsWindow.selectedCards.list.length,
                },
                {
                  text: "取消",
                  onclick: () => {
                    showCardsWindow.hide();
                    gui.gameLayer.stopSelectPlayers();
                    prev();
                  },
                },
              ],
            });
          },
        }),
      })
      .addStep({
        step: new PlayerActionStep({
          handler: ({ current }, { next, prev }) => {
            const cardTypeList = [CardType.JIE_HUO, CardType.WU_DAO, CardType.DIAO_BAO, CardType.PO_YI];
            cardTypeList.splice(cardTypeList.indexOf(current.cardType), 1);
            const showCardsWindow = gui.showCardsWindow;
            showCardsWindow.show({
              title: "请选择卡牌种类B",
              cardList: cardTypeList.map((type) => gui.data.createCardByType(type)),
              limit: 1,
              buttons: [
                {
                  text: "确定",
                  onclick: () => {
                    const type = showCardsWindow.selectedCards.list[0].type;
                    showCardsWindow.hide();
                    gui.gameLayer.pauseSelectPlayers();
                    next({
                      cardType: type,
                    });
                  },
                  enabled: () => !!showCardsWindow.selectedCards.list.length,
                },
                {
                  text: "取消",
                  onclick: () => {
                    showCardsWindow.hide();
                    gui.gameLayer.stopSelectPlayers();
                    prev();
                  },
                },
              ],
            });
          },
        }),
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_BIAN_ZE_TONG_TOS, {
          enable: true,
          cardTypeA: data[1].cardType,
          cardTypeB: data[0].cardType,
          seq: gui.seq,
        });
      })
      .onCancel(() => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_BIAN_ZE_TONG_TOS, {
          enable: false,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffect(gameData: GameData, { playerId, enable, cardTypeA, cardTypeB }: skill_bian_ze_tong_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const gameLog = gameData.gameLog;
      const cardA = gameData.createCardByType(<number>cardTypeA);
      const cardB = gameData.createCardByType(<number>cardTypeB);

      for (let player of gameData.playerList) {
        player.addTag(TagName.CARD_NAME_REPLACED, { cardTypeA, cardTypeB });
      }

      GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
        for (let player of gameData.playerList) {
          player.removeTag(TagName.CARD_NAME_REPLACED);
        }
      });

      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}宣言了${gameLog.formatCard(cardA)}${gameLog.formatCard(cardB)}`)
      );
      gameLog.addData(
        new GameLog(`直到回合结束，所有玩家的${gameLog.formatCard(cardA)}只能当做${gameLog.formatCard(cardB)}牌使用。`)
      );

      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }
}
