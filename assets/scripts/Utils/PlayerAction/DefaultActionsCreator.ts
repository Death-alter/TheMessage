import { NetworkEventCenter } from "../../Event/EventTarget";
import { NetworkEventToS } from "../../Event/type";
import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStepRoute } from "./PlayerAction";
import { PlayerActionName, PlayerActionStepName } from "./type";

const list: { [key in PlayerActionName]: (gui: GameManager) => PlayerActionStepRoute } = {
  [PlayerActionName.MAIN_PHASE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_MAIN_PHASE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
        next: [
          {
            step: PlayerActionStepName.DO_PLAY_CARD,
          },
        ],
      },
    ],
  }),
  [PlayerActionName.FIGHT_PHASE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_FIGHT_PHASE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
        next: [
          {
            step: PlayerActionStepName.DO_PLAY_CARD,
          },
        ],
      },
    ],
  }),
  [PlayerActionName.SEND_MESSAGE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_SEND_MESSAGE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_SEND,
        next: [
          {
            step: PlayerActionStepName.DO_PLAY_CARD,
          },
          {
            step: PlayerActionStepName.DO_SEND_MESSAGE,
          },
        ],
      },
    ],
  }),
  [PlayerActionName.RECEIVE_MESSAGE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_RECEIVE_MESSAGE_TOOLTIP,
    next: [
      (flag) => {
        NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
          receive: flag,
          seq: gui.seq,
        });
      },
    ],
  }),
  [PlayerActionName.PLAYER_DYING_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_PLAYER_DYING_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_MESSAGE,
        next: [
          (data) => {
            NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
              use: true,
              cardId: data.cardId,
              targetCardId: data.targetCardId,
              seq: gui.seq,
            });
          },
        ],
      },
      () => {
        NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
          use: false,
          seq: gui.seq,
        });
      },
    ],
  }),
  [PlayerActionName.PLAYER_DIE_GIVE_CARD_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_DIE_GIVE_CARD_TOOLTIP,
    next: [
      ({ targetPlayerId, cardId }) => {
        NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
          targetPlayerId,
          cardId,
          seq: gui.seq,
        });
      },
      () => {
        NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
          targetPlayerId: 0,
          cardId: [],
          seq: gui.seq,
        });
      },
    ],
  }),
  [PlayerActionName.DO_SEND_MESSAGE_ACTION]: (gui: GameManager) => ({
    step: PlayerActionStepName.SET_SEND_MESSAGE_TOOLTIP,
    next: [
      {
        step: PlayerActionStepName.SELECT_HAND_CARD_TO_SEND,
        next: [
          {
            step: PlayerActionStepName.DO_PLAY_CARD,
          },
          () => {
            
          },
        ],
      },
    ],
  }),
};

export default list;
