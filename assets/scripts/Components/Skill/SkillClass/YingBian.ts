import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType } from "../../Card/type";
import { createCard } from "../../Card";
import { GameManager } from "../../../Manager/GameManager";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class YingBian extends ActiveSkill {
  get useable() {
    return true;
  }

  constructor(character: Character) {
    super({
      name: "应变",
      character,
      description: "你的【截获】可以当做【误导】使用。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init() {}

  dispose() {}

  onUse(gui: GameManager) {
    PlayerAction.addTempStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`请选择一张【截获】当做【误导】使用`);
          gui.gameLayer.startSelectHandCards({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                const card = gui.selectedHandCards.list[0];
                if (card.type === CardType.JIE_HUO) {
                  const card = createCard({
                    id: gui.selectedHandCards.list[0].id,
                    type: CardType.WU_DAO,
                  });
                  card.onPlay(gui);
                  this.gameObject.isOn = false;
                  next();
                }
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
    });
  }
}
