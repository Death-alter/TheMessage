export enum PlayerActionName {
  MAIN_PHASE_ACTION = "mainPhaseAction",
  FIGHT_PHASE_ACTION = "fightPhaseAction",
  SEND_MESSAGE_ACTION = "sendMessageAction",
  RECEIVE_MESSAGE_ACTION = "receiveMessageAction"
}

export enum PlayerActionStepName {
  SET_MAIN_PHASE_TOOLTIP = "setMainPhaseTooltip",
  SET_FIGHT_PHASE_TOOLTIP = "setFightPhaseTooltip",
  SET_SEND_MESSAGE_TOOLTIP = "setSendMessageTooltip",
  SET_RECEIVE_MESSAGE_TOOLTIP = "setReceiveMessageTooltip",
  SET_PLAYER_DYING_TOOLTIP = "setPlayerDyingTooltip",
  SELECT_HAND_CARD = "selectHandCard",
  SELECT_HAND_CARD_AND_CONFIRM = "selectHandCardAndConfirm",
  SELECT_HAND_CARD_TO_PLAY = "selectHandCardToPlay",
  SELECT_HAND_CARD_TO_SEND = "selectHandCardToSend",
  SELECT_PLAYER = "selectPlayer",
  DO_PLAY_CARD = "doPlayerCard",
  DO_SEND_MESSAGE = "doSendMessage",
}
