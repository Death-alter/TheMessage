import { skill_miao_shou_kuai_ji_a_toc, skill_miao_shou_kuai_ji_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { PassiveSkill } from "../Skill";

export class MiaoShouKuaiJi extends PassiveSkill {
  constructor(character: Character) {
    super({
      name: "妙手快记",
      character,
      description: "你相邻玩家的回合结束时，你可以把弃牌堆顶的牌加入你的手牌，然后弃一张牌。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_SHOU_KUAI_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_MIAO_SHOU_KUAI_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_SHOU_KUAI_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_MIAO_SHOU_KUAI_JI_B_TOC);
  }

  onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_miao_shou_kuai_ji_a_toc) {
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【妙手快记】`));

    const discardPileCard = gameData.createCard(card);
    gameData.playerAddHandCard(player, discardPileCard);

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}把弃牌堆顶的${gameLog.formatCard(discardPileCard)}加入手牌`)
    );

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: discardPileCard,
      from: { location: CardActionLocation.DISCARD_PILE },
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
      params: {
        skill: this,
      },
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "selectDiscardCard",
      });
    }
  }

  selectDiscardCard(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一张手牌弃置");
    gui.gameLayer.startSelectHandCards({ num: 1 });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const cardId = gui.selectedHandCards.list[0].id;
          gui.gameLayer.stopSelectHandCards();
          NetworkEventCenter.emit(NetworkEventToS.SKILL_MIAO_SHOU_KUAI_JI_B_TOS, {
            cardId,
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedHandCards.list.length > 0,
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId }: skill_miao_shou_kuai_ji_b_toc) {
    const player = gameData.playerList[playerId];
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
