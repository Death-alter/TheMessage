import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType } from "../../Card/type";
import { createCard } from "../../Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { skill_jie_qu_toc } from "../../../../protobuf/proto";
import { Player } from "../../Player/Player";

export class JieQu extends ActiveSkill {
  private usageCount: number = 0;
  private isSelfTurn: boolean = false;

  get useable() {
    return this.usageCount === 0 && !this.isSelfTurn;
  }

  constructor(character: Character) {
    super({
      name: "截取",
      character,
      description: "每局游戏一次，其他玩家的争夺阶段，你可以将一张手牌作为【截获】打出。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIE_QU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIE_QU_TOC);
    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  onTurnChange({ turnPlayer }) {
    this.isSelfTurn = turnPlayer.id === 0;
  }

  canUse(gui: GameManager) {
    return gui.data.messagePlayerId !== 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addTempStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`请选择一张牌当做【截获】使用`);
          gui.gameLayer.startSelectHandCards({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                const addTempStepcard = createCard({
                  id: gui.selectedHandCards.list[0].id,
                  type: CardType.JIE_HUO,
                });
                addTempStepcard.onPlay(gui);
                this.gameObject.isOn = false;
                next();
              },
              enabled: () => gui.selectedHandCards.list.length > 0,
            },
            {
              text: "取消",
              onclick: () => {
                prev();
              },
            },
          ]);
        },
      }),
    });
  }

  onEffect(gameData: GameData, { playerId }: skill_jie_qu_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【截取】`));
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
