import { skill_tou_tian_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Character } from "../../Character/Character";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class TouTian extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "偷天",
      character,
      description: "争夺阶段，你可以翻开此角色牌，然后视为你使用了一张【截获】。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GUI_ZHA_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_GUI_ZHA_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    if (gameData.messagePlayerId === 0) {
      tooltip.setText(`情报在你面前，不能使用【偷天】`);
    } else {
      tooltip.setText(`是否使用【偷天】？`);
    }
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_TOU_TIAN_TOS, {
            seq: gameData.gameObject.seq,
          });
          this.gameObject.isOn = false;
        },
        enabled: gameData.messagePlayerId !== 0,
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId }: skill_tou_tian_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【偷天】`));
  }
}
