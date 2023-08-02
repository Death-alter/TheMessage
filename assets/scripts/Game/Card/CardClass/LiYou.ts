import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { GameLog } from "../../GameLog/GameLog";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class LiYou extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      src: "LiYou",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameUI): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择要利诱的目标`);
    gui.startSelectPlayer({
      num: 1,
      onSelect: (player) => {
        tooltip.setText(`是否使用利诱？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.USE_LI_YOU_TOS, {
                cardId: this.id,
                playerId: player.id,
                seq: gui.seq,
              });
              this.onDeselected(gui);
            },
          },
        ]);
      },
    });
  }

  onDeselected(gui: GameUI) {
    gui.stopSelectPlayer();
    gui.clearSelectedPlayers();
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
