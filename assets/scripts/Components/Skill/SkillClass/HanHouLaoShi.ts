import { CardColor } from "../../Card/type";
import { PassiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { UIEvent } from "../../../Event/type";
import { UIEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../Card/Card";
import { TagName } from "../../../type";

export class HanHouLaoShi extends PassiveSkill {
  doSendMessage: Function;

  constructor(character: Character) {
    super({
      name: "憨厚老实",
      character,
      description: "你的回合中，你无法把纯黑色手牌作为情报传出（除非你只有纯黑色手牌）。",
    });
  }

  init(gameData: GameData, player) {
    player.addTag(TagName.CANNOT_SEND_MESSAGE_COLOR, { color: [CardColor.BLACK], strict: true });
    player.addTag(TagName.HAN_HOU_LAO_SHI);
    if (player.id === 0) {
      UIEventCenter.on(UIEvent.ON_SELECT_MESSAGE_TO_SEND, this.onSelectMessageToSend, this);
    }
  }

  dispose() {
    UIEventCenter.off(UIEvent.ON_SELECT_MESSAGE_TO_SEND, this.onSelectMessageToSend, this);
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
                    card.onPlay(gui);
                    next();
                  },
                  enabled: () => gui.uiLayer.cardCanPlayed(card).canPlay && card.canPlay(gui),
                },
                {
                  text: "传递情报",
                  onclick: () => {
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
}
