import { skill_xin_si_chao_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class XinSiChao extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor() {
    super({
      name: "新思潮",
      description: "出牌阶段限一次，你可以弃置一张手牌，然后摸两张牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_XIN_SI_CHAO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_XIN_SI_CHAO_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    const handCardList = gameData.gameObject.handCardList;

    tooltip.setText(`请选择一张手牌丢弃`);
    handCardList.selectedCards.limit = 1;

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_XIN_SI_CHAO_TOS, {
            cardId: handCardList.selectedCards.list[0].id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => {
          return handCardList.selectedCards.list.length === 1;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId }: skill_xin_si_chao_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【新思潮】`));
    ++this.usageCount;
  }
}
