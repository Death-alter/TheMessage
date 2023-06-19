import { skill_gui_zha_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CardType } from "../../Card/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";

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

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`请选择一名角色`);
    gameData.gameObject.startSelectPlayer({
      num: 1,
      onSelect: () => {
        tooltip.setText(`请选择要执行的操作`);
        tooltip.buttons.setButtons([
          {
            text: "威逼",
            onclick: () => {
              gameData.gameObject.showCardsWindow.show({
                title: "选择目标交给你的卡牌种类",
                cardList: [
                  gameData.createCardByType(CardType.JIE_HUO),
                  gameData.createCardByType(CardType.WU_DAO),
                  gameData.createCardByType(CardType.DIAO_BAO),
                  gameData.createCardByType(CardType.CHENG_QING),
                ],
                limit: 1,
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      NetworkEventCenter.emit(NetworkEventToS.SKILL_GUI_ZHA_TOS, {
                        targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                        cardType: CardType.WEI_BI,
                        wantType: gameData.gameObject.showCardsWindow.selectedCards.list[0].type,
                        seq: gameData.gameObject.seq,
                      });
                      gameData.gameObject.showCardsWindow.hide();
                      gameData.gameObject.stopSelectPlayer();
                      gameData.gameObject.clearSelectedPlayers();
                    },
                    enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      gameData.gameObject.showCardsWindow.hide();
                      gameData.gameObject.clearSelectedPlayers();
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
                targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                cardType: CardType.LI_YOU,
                seq: gameData.gameObject.seq,
              });
              gameData.gameObject.stopSelectPlayer();
              gameData.gameObject.clearSelectedPlayers();
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
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}对【${targetPlayer.seatNumber + 1}号】${
          targetPlayer.character.name
        }使用技能【诡诈】`
      )
    );
    ++this.usageCount;
    if (playerId === 0) {
      this.gameObject.isOn = false;
    }
  }
}
