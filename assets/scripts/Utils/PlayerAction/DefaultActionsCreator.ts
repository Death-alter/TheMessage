import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStepRoute } from "./PlayerAction";
import { PlayerActionName, PlayerActionStepName } from "./type";

const list: { [key in PlayerActionName]: (gui: GameManager) => PlayerActionStepRoute } = {
  [PlayerActionName.MAIN_PHASE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_MAIN_PHASE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
        next: [],
      },
    ],
  }),
  [PlayerActionName.FIGHT_PHASE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_FIGHT_PHASE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
        next: [],
      },
    ],
  }),
};

export default list;
