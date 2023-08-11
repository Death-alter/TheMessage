import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import {
  skill_ru_bi_zhi_shi_a_toc,
  skill_ru_bi_zhi_shi_b_toc,
  skill_xian_fa_zhi_ren_a_toc,
  skill_xian_fa_zhi_ren_b_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";

export class RuBiZhiShi extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "如臂指使",
      character,
      description:
        "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，查看一名角色的手牌，然后可以从中选择一张弃置，或选择一张符合使用时机的牌，由该角色使用（若如【误导】等需要做出选择的，则由你选择）。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_RU_BI_ZHI_SHI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_RU_BI_ZHI_SHI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );

    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_RU_BI_ZHI_SHI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_RU_BI_ZHI_SHI_B_TOC);
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_CHENG_QING_TOC, this.onPlayerDying, this);
  }

  onPlayerDying() {
    if (this.gameObject) {
      this.gameObject.useable = true;
      ProcessEventCenter.once(ProcessEvent.STOP_COUNT_DOWN, () => {
        this.gameObject.useable = false;
      });
    }
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;

    tooltip.setText(`请选择要查看手牌的角色`);
    gui.gameLayer.startSelectPlayers({
      num: 1,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_A_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => {
          return gui.selectedPlayers.list.length === 1;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gui.uiLayer.playerActionManager.switchToDefault();
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, cards, waitingSecond, seq }: skill_ru_bi_zhi_shi_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【如臂指使】`));
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}查看${gameLog.formatPlayer(targetPlayer)}的手牌}`));

    if (playerId === 0) {
      const handCards = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseCard",
        params: {
          handCards,
        },
      });
    }
  }

  promptChooseCard(gui: GameManager, params) {
    const { handCards } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "请选择一张手牌",
      limit: 1,
      cardList: handCards,
      buttons: [
        {
          text: "弃置",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_B_TOS, {
              enable: true,
              cardId: showCardsWindow.selectedCards.list[0].id,
              useCard: false,
              seq: gui.seq,
            });
            showCardsWindow.hide();
          },
          enabled: () => showCardsWindow.selectedCards.list.length > 0,
        },
        {
          text: "使用",
          onclick: () => {
            showCardsWindow.selectedCards.list[0].onSelectedToPlay(gui);
            showCardsWindow.hide();
          },
          enabled: () =>
            showCardsWindow.selectedCards.list.length > 0 &&
            gui.uiLayer.cardCanPlayed(showCardsWindow.selectedCards.list[0]).canPlay,
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_RU_BI_ZHI_SHI_B_TOS, {
              enable: false,
              seq: gui.seq,
            });
            showCardsWindow.hide();
          },
        },
      ],
    });
  }

  onEffectB(gameData: GameData, { enable, card, useCard, targetPlayerId }: skill_ru_bi_zhi_shi_b_toc) {
    // const gameLog = gameData.gameLog;
    // const player = gameData.playerList[playerId];
    // const targetPlayer = gameData.playerList[targetPlayerId];

    // const handCard = gameData.createCard(card);

    // if (enable) {
    //   if (useCard) {
    //     gameLog.addData(
    //       new GameLog(
    //         `${gameLog.formatPlayer(player)}选择使用${gameLog.formatPlayer(targetPlayer)}的手牌${gameLog.formatCard(
    //           handCard
    //         )}`
    //       )
    //     );
    //   } else {
    //     gameLog.addData(
    //       new GameLog(
    //         `${gameLog.formatPlayer(player)}选择弃置${gameLog.formatPlayer(targetPlayer)}的手牌${gameLog.formatCard(
    //           handCard
    //         )}`
    //       )
    //     );
    //   }
    // }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
