import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardDirection } from "../../Card/type";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { PlayerAction } from "../../../UI/PlayerAction";
import { GamePhase } from "../../../GameManager/type";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { NetworkEventCenter } from "../../../Event/EventTarget";

export class LianLuo extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "联络",
      character,
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
      useablePhase: [GamePhase.SEND_PHASE_START],
    });
  }

  get useable() {
    return true;
  }

  init() {}

  dispose() {}

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    new PlayerAction({
      actions: [
        {
          name: "selectHandCard",
          handler: () =>
            new Promise((resolve, reject) => {
              tooltip.setText("请选择一张牌当做情报传出");
              gameData.gameObject.startSelectHandCard({
                num: 1,
              });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    gameData.gameObject.selectedHandCards.lock();
                    resolve(null);
                  },
                  enabled: () => gameData.gameObject.selectedHandCards.list.length > 0,
                },
                {
                  text: "取消",
                  onclick: () => {
                    this.gameObject.isOn = false;
                    gameData.gameObject.stopSelectHandCard();
                    gameData.gameObject.clearSelectedHandCards();
                    gameData.gameObject.promotSendMessage("传递阶段，请选择要传递的情报或要使用的卡牌");
                    reject(null);
                  },
                },
              ]);
            }),
        },
        {
          name: "selectDirection",
          handler: () =>
            new Promise((resolve, reject) => {
              tooltip.setText("请选择情报传递的方向");
              tooltip.buttons.setButtons([
                {
                  text: "左",
                  onclick: () => {
                    resolve(CardDirection.LEFT);
                  },
                },
                {
                  text: "上",
                  onclick: () => {
                    resolve(CardDirection.UP);
                  },
                },
                {
                  text: "右",
                  onclick: () => {
                    resolve(CardDirection.RIGHT);
                  },
                },
              ]);
            }),
        },
      ],
      complete: (direction) => {
        gameData.gameObject.doSendMessage(direction);
        NetworkEventCenter.once(NetworkEventToC.SEND_MESSAGE_CARD_TOC, () => {
          this.gameObject.isOn = false;
        });
      },
    }).start();
  }
}
