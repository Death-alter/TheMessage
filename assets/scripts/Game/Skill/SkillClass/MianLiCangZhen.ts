import { skill_mian_li_cang_zhen_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardColor } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { Card } from "../../Card/Card";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";
import { CardActionLocation } from "../../../GameManager/type";

export class MianLiCangZhen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "绵里藏针",
      character,
      description: "你传出的情报被接收后，可以将一张黑色手牌置入接收者的情报区，然后摸一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAN_LI_CANG_ZHEN_TOC);
  }

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你传出的情报被接收，是否使用【绵里藏针】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一张黑色手牌`);
          gui.startSelectHandCard({ num: 1 });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAN_LI_CANG_ZHEN_TOS, {
                  cardId: gui.selectedHandCards.list[0].id,
                  seq: gui.seq,
                });
              },
              enabled: () => {
                return (
                  gui.selectedHandCards.list.length && Card.hasColor(gui.selectedHandCards.list[0], CardColor.BLACK)
                );
              },
            },
          ]);
        },
        enabled: () => Card.hasColor(gui.data.handCardList.list, CardColor.BLACK),
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, card, targetPlayerId }: skill_mian_li_cang_zhen_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;
    const handCard = gameData.playerRemoveHandCard(player, card);
    targetPlayer.addMessage(handCard);
    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【绵里藏针】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
          targetPlayer
        )}的情报区`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
