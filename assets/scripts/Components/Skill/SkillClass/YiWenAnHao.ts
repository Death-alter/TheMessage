import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType, CardUsableStatus } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameData } from "../../../Manager/GameData";
import { skill_ying_bian_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { Card } from "../../Card/Card";
import { Player } from "../../Player/Player";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { TagName } from "../../../type";

export class YiWenAnHao extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "译文暗号",
      character,
      description: "每局游戏限一次，你可以将一张【破译】当做【调包】使用。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_WEN_AN_HAO_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_WEN_AN_HAO_TOC);
  }

  canUse(gui: GameManager) {
    const data = gui.data.selfPlayer.getTagData(TagName.CARD_NAME_REPLACED);
    return !data || data.cardTypeA !== CardType.PO_YI;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张【破译】当做【调包】使用",
        filter: (card: Card) => {
          if (card.type === CardType.PO_YI) {
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
            const card = gui.data.createCardWithNewType(gui.selectedHandCards.list[0], CardType.DIAO_BAO);
            card.onPlay(gui);
            this.gameObject.isOn = false;
            next();
          });
        },
      }),
    });
  }

  onEffect(gameData: GameData, { playerId }: skill_ying_bian_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });
    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
