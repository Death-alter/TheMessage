import { skill_gui_zha_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { CardType } from "../../Card/type";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";

export class GuiZha extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "诡诈",
      character,
      description: "出牌阶段限一次，你可以指定一名角色，然后视为你对其使用了一张【威逼】或【利诱】。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GUI_ZHA_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_GUI_ZHA_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    tooltip.setText(`请选择一名角色`);
    gui.gameLayer.startSelectPlayers({
      num: 1,
      onSelect: () => {
        tooltip.setText(`请选择要执行的操作`);
        tooltip.buttons.setButtons([
          {
            text: "威逼",
            onclick: () => {
              showCardsWindow.show({
                title: "选择目标交给你的卡牌种类",
                cardList: [
                  gui.data.createCardByType(CardType.JIE_HUO),
                  gui.data.createCardByType(CardType.WU_DAO),
                  gui.data.createCardByType(CardType.DIAO_BAO),
                  gui.data.createCardByType(CardType.CHENG_QING),
                ],
                limit: 1,
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_GUI_ZHA_TOS, {
                        targetPlayerId: gui.selectedPlayers.list[0].id,
                        cardType: CardType.WEI_BI,
                        wantType: gui.showCardsWindow.selectedCards.list[0].type,
                        seq: gui.seq,
                      });
                      showCardsWindow.hide();
                      gui.gameLayer.stopSelectPlayers();
                    },
                    enabled: () => !!showCardsWindow.selectedCards.list.length,
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      showCardsWindow.hide();
                      gui.gameLayer.stopSelectPlayers();
                    },
                  },
                ],
              });
            },
          },
          {
            text: "利诱",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_GUI_ZHA_TOS, {
                targetPlayerId: gui.selectedPlayers.list[0].id,
                cardType: CardType.LI_YOU,
                seq: gui.seq,
              });
              gui.gameLayer.stopSelectPlayers();
            },
          },
        ]);
      },
      onDeselect: () => {
        tooltip.setText(`请选择一名角色`);
      },
    });
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, cardType }: skill_gui_zha_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}对${gameLog.formatPlayer(targetPlayer)}使用技能【诡诈】`)
    );
    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
