import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class LiYou extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      sprite: "images/cards/LiYou",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    gameData.gameObject.selectedPlayers.limit = 1;
    tooltip.setText(`请选择要利诱的目标`);
    ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, () => {
      tooltip.setText(`是否使用利诱？`);
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            const card = gameData.gameObject.handCardList.selectedCards.list[0];
            const player = gameData.gameObject.selectedPlayers.list[0];
            NetworkEventCenter.emit(NetworkEventToS.USE_LI_YOU_TOS, {
              cardId: card.id,
              playerId: player.id,
              seq: gameData.gameObject.seq,
            });
            gameData.gameObject.resetSelectPlayer();
            gameData.gameObject.selectedPlayers.limit = 0;
            ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
          },
        },
      ]);
    });
  }

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.resetSelectPlayer();
    gameData.gameObject.selectedPlayers.limit = 0;
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { userId, targetPlayerId, targetCard, flag }: CardOnEffectParams): void {
    if (!targetCard) return;
    const card = gameData.createCard(targetCard);
    const targetPlayer = gameData.playerList[targetPlayerId];
    const user = gameData.playerList[userId];
    // gameData.gameObject.cardAction.liYouShowCard(card).then(() => {

    // });
    if (flag) {
      targetPlayer.addHandCard(card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: user,
        card: card,
      });
    } else {
      const card = gameData.createMessage(targetCard);
      targetPlayer.addMessage(card);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: card,
      });
    }
  }
}
