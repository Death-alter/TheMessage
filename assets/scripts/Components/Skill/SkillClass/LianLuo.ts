import { CardDirection } from "../../Card/type";
import { PassiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { UIEvent } from "../../../Event/type";
import { UIEventCenter } from "../../../Event/EventTarget";
import { GameData } from "../../../Manager/GameData";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameManager } from "../../../Manager/GameManager";

export class LianLuo extends PassiveSkill {
  doSendMessage: Function;

  constructor(character: Character) {
    super({
      name: "联络",
      character,
      description: "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }

  init(gameData: GameData, player) {
    if (player.id === 0) {
      UIEventCenter.on(UIEvent.BEFORE_SEND_MESSAGE, this.selectMessageDirection, this);
    }
  }

  dispose() {
    UIEventCenter.off(UIEvent.BEFORE_SEND_MESSAGE, this.selectMessageDirection, this);
  }

  selectMessageDirection({ gui, canCancel }: { gui: GameManager; canCancel: boolean }) {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: ({ initial, current }, { next, prev }) => {
          gui.tooltip.setText("请选择情报传递的方向");
          const buttons = [
            {
              text: "左",
              onclick: () => {
                next({ direction: CardDirection.LEFT });
              },
            },
            {
              text: "上",
              onclick: () => {
                next({ direction: CardDirection.UP });
              },
            },
            {
              text: "右",
              onclick: () => {
                next({ direction: CardDirection.RIGHT });
              },
            },
          ];
          if (initial.canCancel || current.index !== 0) {
            buttons.push({
              text: "取消",
              onclick: () => {
                prev();
              },
            });
          }
          gui.tooltip.buttons.setButtons(buttons);
        },
      }),
      data: {
        canCancel,
      },
    });
  }
}
