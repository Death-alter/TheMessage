import { skill_cun_bu_bu_rang_toc, skill_wait_for_cun_bu_bu_rang_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";

export class CunBuBuRang extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "寸步不让",
      character,
      description: "一名其他角色获得你的手牌后，你可以抽取该角色的一张手牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CUN_BU_BU_RANG_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_CUN_BU_BU_RANG_TOC,
      (data) => {
        this.waitingForUse(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CUN_BU_BU_RANG_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_CUN_BU_BU_RANG_TOC);
  }

  waitingForUse(
    gameData: GameData,
    { playerId, targetPlayerId, waitingSecond, seq }: skill_wait_for_cun_bu_bu_rang_toc
  ) {
    const targetPlayer = gameData.playerList[targetPlayerId];

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.USE_SKILL,
      seq: seq,
      params: {
        targetPlayer,
        skill: this,
      },
    });
  }

  onTrigger(gui: GameManager, params: { targetPlayer: Player }): void {
    const { targetPlayer } = params;
    const gameLog = gui.gameLog;
    const tooltip = gui.tooltip;
    tooltip.setText(`${gameLog.formatPlayer(targetPlayer)}获得了你的手牌，是否使用【寸步不让】`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CUN_BU_BU_RANG_TOS, {
            enable: true,
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CUN_BU_BU_RANG_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, enable, card }: skill_cun_bu_bu_rang_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameLog;

      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
        player,
        skill: this,
      });

      const handCard = gameData.playerRemoveHandCard(targetPlayer, card);
      gameData.playerAddHandCard(player, handCard);

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}抽取${gameLog.formatPlayer(targetPlayer)}的一张手牌`)
      );

      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
        player,
        skill: this,
      });
    }
  }
}
