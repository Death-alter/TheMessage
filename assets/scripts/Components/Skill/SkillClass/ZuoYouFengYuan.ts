import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_zuo_you_feng_yuan_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";

export class ZuoYouFengYuan extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "左右逢源",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后指定两名角色，他们弃置所有手牌，然后摸三张牌（由你指定的角色先摸）。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZUO_YOU_FENG_YUAN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZUO_YOU_FENG_YUAN_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.addTempStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`请选择两名角色`);
          gui.gameLayer.startSelectPlayers({
            num: 2,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                next({ targetPlayerIds: gui.selectedPlayers.list.map((player) => player.id) });
              },
              enabled: () => gui.selectedPlayers.list.length === 2,
            },
            {
              text: "取消",
              onclick: () => {
                this.gameObject.isOn = false;
                prev();
              },
            },
          ]);
        },
      }),
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_ZUO_YOU_FENG_YUAN_TOS, {
        targetPlayerIds: data[0].targetPlayerIds,
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { playerId, targetPlayerIds }: skill_zuo_you_feng_yuan_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer1 = gameData.playerList[targetPlayerIds[0]];
    const targetPlayer2 = gameData.playerList[targetPlayerIds[1]];

    new GameLog(
      `${gameLog.formatPlayer(player)}使用【左右逢源】，指定${gameLog.formatPlayer(
        targetPlayer1
      )}、${gameLog.formatPlayer(targetPlayer2)}`
    );

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
