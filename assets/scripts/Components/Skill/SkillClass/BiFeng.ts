import { TriggerSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_bi_feng_toc } from "../../../../protobuf/proto";
import { DataEventCenter, GameEventCenter, NetworkEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { DataEvent, GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent, UIEvent } from "../../../Event/type";
import { WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CardType } from "../../Card/type";

export class BiFeng extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "避风",
      character,
      description: "争夺阶段限一次，“观海”后你可以无效你使用的【截获】或【误导】，然后摸两张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.WAIT_FOR_SKILL_BI_FENG_TOC,
      (data) => {
        UIEventCenter.emit(UIEvent.START_COUNT_DOWN, {
          playerId: data.playerId,
          second: data.waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: data.seq,
          params: {
            skill: this,
          },
        });
      },
      this,
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_BI_FENG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this,
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.WAIT_FOR_SKILL_BI_FENG_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_BI_FENG_TOC);
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你使用了【观海】，是否使用【避风】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_BI_FENG_TOS, {
            enable: true,
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_BI_FENG_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card }: skill_bi_feng_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    const data: any = {
      card: card,
      cardType: card.cardType,
      isActual: true,
      userId: playerId,
    };

    if (card.cardType === CardType.WU_DAO) {
      data.targetPlayerId = targetPlayerId;
    }

    DataEventCenter.emit(DataEvent.CARD_PLAYED, data);
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用【避风】`));
    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}使用的${gameLog.formatCard(gameData.createCard(card))}被无效`),
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
