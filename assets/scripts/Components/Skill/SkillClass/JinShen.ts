import { skill_jin_shen_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { TriggerSkill } from "../../../Components/Skill/Skill";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { Character } from "../../../Components/Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";

export class JinShen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "谨慎",
      character,
      description: "你接收双色情报后，可以用一张手牌与该情报面朝上互换。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_SHEN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_SHEN_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了双色情报，是否使用【谨慎】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const handCardList = gui.data.handCardList;
          handCardList.selectedCards.limit = 1;
          tooltip.setText(`请选择一张手牌与接收的情报互换`);
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_SHEN_TOS, {
                  cardId: handCardList.selectedCards.list[0].id,
                  seq: gui.seq,
                });
              },
              enabled: () => {
                return handCardList.selectedCards.list.length === 1;
              },
            },
          ]);
        },
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

  onEffect(gameData: GameData, { playerId, card }: skill_jin_shen_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    const handCard = gameData.playerRemoveHandCard(player, card);
    const messages = player.getMessagesCopy();
    const message = player.removeMessage(messages[messages.length - 1].id);
    gameData.playerAddHandCard(player, message);
    player.addMessage(handCard);
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【谨慎】`));
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}和情报${gameLog.formatCard(message)}互换`
      )
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
