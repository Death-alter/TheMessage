export enum PlayerActionName {
  MAIN_PHASE_ACTION = "mainPhaseAction",
  FIGHT_PHASE_ACTION = "fightPhaseAction",
  SEND_MESSAGE_ACTION = "sendMessageAction",
  DO_SEND_MESSAGE_ACTION = "doSendMessageAction",
  RECEIVE_MESSAGE_ACTION = "receiveMessageAction",
  PLAYER_DYING_ACTION = "playerDyingAction",
  PLAYER_DIE_GIVE_CARD_ACTION = "playerDieGiveCardAction",
}

export enum PlayerActionStepName {
  SET_MAIN_PHASE_TOOLTIP = "setMainPhaseTooltip",
  SET_FIGHT_PHASE_TOOLTIP = "setFightPhaseTooltip",
  SET_SEND_MESSAGE_TOOLTIP = "setSendMessageTooltip",
  SET_RECEIVE_MESSAGE_TOOLTIP = "setReceiveMessageTooltip",
  SET_PLAYER_DYING_TOOLTIP = "setPlayerDyingTooltip",
  SET_DIE_GIVE_CARD_TOOLTIP = "setDieGiveCardTooltip",
  SELECT_HAND_CARD = "selectHandCard",
  SELECT_HAND_CARD_AND_CONFIRM = "selectHandCardAndConfirm",
  SELECT_HAND_CARD_TO_PLAY = "selectHandCardToPlay",
  SELECT_HAND_CARD_TO_SEND = "selectHandCardToSend",
  SELECT_PLAYER = "selectPlayer",
  DO_PLAY_CARD = "doPlayerCard",
  SELECT_PLAYER_MESSAGE = "selectPlayerMessage",
  SELECT_MESSAGE_TARGET = "selectMessageTarget",
}
