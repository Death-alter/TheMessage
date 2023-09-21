import { CardColor } from "../../Card/type";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent, UIEvent } from "../../../Event/type";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../Card/Card";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { skill_han_hou_lao_shi_toc, skill_wait_for_han_hou_lao_shi_toc } from "../../../../protobuf/proto";
import { GameLog } from "../../GameLog/GameLog";

export class HanHouLaoShi extends PassiveSkill {
  doSendMessage: Function;

  constructor(character: Character) {
    super({
      name: "憨厚老实",
      character,
      description:
        "你无法传出纯黑色情报（除非手牌中只有纯黑色情报）。你传出的情报被其他角色接收后，接收者必须交给你一张手牌。",
    });
  }

  init(gameData: GameData, player) {
    if (player.id === 0) {
      UIEventCenter.on(UIEvent.ON_SELECT_MESSAGE_TO_SEND, this.onSelectMessageToSend, this);
    }
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_HAN_HOU_LAO_SHI_TOC,
      (data: skill_wait_for_han_hou_lao_shi_toc) => {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: data.messagePlayerId,
          second: data.waitingSecond,
          type: WaitingType.HANDLE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });

        if (data.messagePlayerId === 0) {
          GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
            skill: this,
            handler: "selectHandcard",
            params: {
              player: gameData.playerList[data.playerId],
            },
          });
        }

        GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
          player,
          skill: this,
        });
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HAN_HOU_LAO_SHI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    UIEventCenter.off(UIEvent.ON_SELECT_MESSAGE_TO_SEND, this.onSelectMessageToSend, this);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_HAN_HOU_LAO_SHI_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_HAN_HOU_LAO_SHI_TOC);
  }

  onSelectMessageToSend(gui: GameManager) {
    const handCards = [...gui.data.handCardList.list];
    let flag = true;
    for (let card of handCards) {
      if (!(card.color.length === 1 && card.color[0] === CardColor.BLACK)) {
        flag = false;
      }
    }

    PlayerAction.clear();
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          gui.tooltip.setText("传递阶段，请选择要传递的情报或要使用的卡牌");
          gui.tooltip.buttons.setButtons([]);
          gui.gameLayer.startSelectHandCards({
            num: 1,
            onSelect: (card: Card) => {
              gui.tooltip.setText(`请选择一项操作`);
              gui.tooltip.buttons.setButtons([
                {
                  text: "使用卡牌",
                  onclick: () => {
                    gui.gameLayer.pauseSelectHandCards();
                    card.onPlay(gui);
                    next();
                  },
                  enabled: () => gui.uiLayer.cardCanPlayed(card).canPlay && card.canPlay(gui),
                },
                {
                  text: "传递情报",
                  onclick: () => {
                    gui.gameLayer.pauseSelectHandCards();
                    gui.uiLayer.doSendMessage({ message: card });
                    next();
                  },
                  enabled: () => flag || !(card.color.length === 1 && card.color[0] === CardColor.BLACK),
                },
              ]);
            },
            onDeselect: (card: Card) => {
              gui.tooltip.setText("传递阶段，请选择要传递的情报或要使用的卡牌");
              gui.tooltip.buttons.setButtons([]);
            },
          });
        },
      }),
    }).start();
  }

  selectHandcard(gui: GameManager, params): void {
    const { player } = params;
    const gameLog = gui.gameLog;
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了${gameLog.formatPlayer(player)}传出的情报，请选择一张手牌交给该角色`);
    gui.gameLayer.startSelectHandCards({ num: 1 });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const cardId = gui.selectedHandCards.list[0].id;
          gui.gameLayer.stopSelectHandCards();
          NetworkEventCenter.emit(NetworkEventToS.SKILL_HAN_HOU_LAO_SHI_TOS, {
            cardId,
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length > 0,
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, messagePlayerId, card }: skill_han_hou_lao_shi_toc) {
    const player = gameData.playerList[playerId];
    const messagePlayer = gameData.playerList[messagePlayerId];
    const gameLog = gameData.gameLog;

    const handCard = gameData.playerRemoveHandCard(messagePlayer, card);
    gameData.playerAddHandCard(player, handCard);
    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player: player,
      card: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: messagePlayer },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(messagePlayer)}交给${gameLog.formatPlayer(player)}一张手牌`));
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
