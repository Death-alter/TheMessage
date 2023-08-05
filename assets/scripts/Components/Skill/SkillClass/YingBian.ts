import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType } from "../../Card/type";
import { createCard } from "../../Card";
import { GameManager } from "../../../Manager/GameManager";

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
    const tooltip = gui.tooltip;

    tooltip.setText(`请选择一张【截获】当做【误导】使用`);
    gui.gameLayer.startSelectHandCards({
      num: 1,
      onSelect: (card) => {
        if (card.type === CardType.JIE_HUO) {
          const card = createCard({
            id: gui.selectedHandCards.list[0].id,
            type: CardType.WU_DAO,
          });
          card.onSelectedToPlay(gui);
          this.gameObject.isOn = false;
        }
      },
      onDeselect: () => {
        tooltip.setText(`请选择一张【截获】当做【误导】使用`);
      },
    });
  }
}
