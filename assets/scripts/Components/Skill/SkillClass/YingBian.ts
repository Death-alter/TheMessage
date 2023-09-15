import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType, CardUsableStatus } from "../../Card/type";
import { createCard } from "../../Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameData } from "../../../Manager/GameData";
import { skill_ying_bian_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { GameLog } from "../../GameLog/GameLog";
import { Card } from "../../Card/Card";
import { Player } from "../../Player/Player";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class YingBian extends ActiveSkill {
  get useable() {
    return true;
  }

  constructor(character: Character) {
    super({
      name: "应变",
      character,
      description: "你的【截获】可以当做【误导】使用。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZHENG_DUO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZHENG_DUO_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张【截获】当做【误导】使用",
        filter: (card: Card) => {
          if (card.type === CardType.JIE_HUO) {
            return CardUsableStatus.USABLE;
          } else {
            return CardUsableStatus.UNUSABLE;
          }
        },
        enabled: () => gui.selectedHandCards.list.length > 0,
      },
    }).addStep({
      step: new PlayerActionStep({
        handler: (data, { next, passOnPrev }) => {
          passOnPrev(() => {
            const card = createCard({
              id: gui.selectedHandCards.list[0].id,
              type: CardType.WU_DAO,
            });
            card.onPlay(gui);
            this.gameObject.isOn = false;
            next();
          });
        },
      }),
    });
  }

  onEffect(gameData: GameData, { playerId }: skill_ying_bian_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【应变】`));
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
