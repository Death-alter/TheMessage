import { skill_xin_si_chao_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";

export class XinSiChao extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "新思潮",
      character,
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
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;

    tooltip.setText(`请选择一张手牌丢弃`);
    gui.gameLayer.startSelectHandCards({
      num: 1,
    });

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_XIN_SI_CHAO_TOS, {
            cardId: gui.selectedHandCards.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => {
          return gui.selectedHandCards.list.length === 1;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gui.uiLayer.promptUseHandCard("出牌阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId }: skill_xin_si_chao_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【新思潮】`));
    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
