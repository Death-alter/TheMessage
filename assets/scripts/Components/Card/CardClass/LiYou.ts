import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../Manager/type";
import { GameLog } from "../../GameLog/GameLog";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Player } from "../../Player/Player";

export class LiYou extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onPlay(gui: GameManager): void {
    PlayerAction.addTempStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择利诱的目标",
        num: 1,
        enabled: () => gui.selectedPlayers.list.length > 0,
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.USE_LI_YOU_TOS, {
        cardId: this.id,
        playerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { userId, targetPlayerId, targetCard, flag }: CardOnEffectParams): void {
    if (!targetCard) return;
    const targetPlayer = gameData.playerList[targetPlayerId];
    const user = gameData.playerList[userId];
    const gameLog = gameData.gameLog;
    const card = gameData.createCard(targetCard);
    gameLog.addData(new GameLog(`利诱翻开${gameLog.formatCard(card)}`));

    if (flag) {
      gameData.playerAddHandCard(user, card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: user,
        card: card,
      });
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(user)}把${gameLog.formatCard(card)}加入手牌`));
    } else {
      targetPlayer.addMessage(card);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: card,
      });
      gameLog.addData(new GameLog(`${gameLog.formatCard(card)}被置入${gameLog.formatPlayer(targetPlayer)}的情报区`));
    }
  }
}
