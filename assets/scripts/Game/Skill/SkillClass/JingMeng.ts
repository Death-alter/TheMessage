import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jing_meng_a_toc, skill_jing_meng_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class JingMeng extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "惊梦",
      character,
      description: "你接收黑色情报后，可以查看一名角色的手牌，然后从中选择一张弃置。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JING_MENG_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JING_MENG_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JING_MENG_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JING_MENG_B_TOC);
  }

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了黑色情报，是否使用【惊梦】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText(`请选择一名角色查看手牌`);
          gui.startSelectPlayer({
            num: 1,
            filter: (player) => {
              return player.id !== 0;
            },
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JING_MENG_A_TOS, {
                  targetPlayerId: gui.selectedPlayers.list[0].id,
                  seq: gui.seq,
                });
              },
              enabled: () => !!gui.selectedPlayers.list.length,
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

  onEffectA(gameData: GameData, { playerId, cards, targetPlayerId, waitingSecond, seq }: skill_jing_meng_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      const cardList = cards.map((card) => gameData.createCard(card));
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptSelectCard",
        params: {
          cardList,
        },
      });
    }

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}使用技能【惊梦】，查看${gameLog.formatPlayer(targetPlayer)}的手牌`)
    );
  }

  promptSelectCard(gui: GameUI, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "请选择一张手牌弃置",
      limit: 1,
      cardList,
      buttons: [
        {
          text: "确定",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_JING_MENG_B_TOS, {
              cardId: showCardsWindow.selectedCards.list[0].id,
              seq: gui.seq,
            });
            showCardsWindow.hide();
          },
          enabled: () => !!showCardsWindow.selectedCards.list.length,
        },
      ],
    });
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId }: skill_jing_meng_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    gameLog.addData(
      new GameLog(`${gameLog.formatPlayer(player)}从${gameLog.formatPlayer(targetPlayer)}手中选择一张牌弃置`)
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
