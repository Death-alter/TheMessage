import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GamePhase } from "../../../Manager/type";
import { CardType, CardUsableStatus } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { GameData } from "../../../Manager/GameData";
import { skill_hun_shui_mo_yu_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC } from "../../../Event/type";
import { Player } from "../../Player/Player";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { TagName } from "../../../type";
import { CharacterStatus } from "../../Chatacter/type";

export class HunShuiMoYu extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0 && this.character.status === CharacterStatus.FACE_UP;
  }

  constructor(character: Character) {
    super({
      name: "浑水摸鱼",
      character,
      description: "每局游戏限一次，你可以将一张手牌当做【欲擒故纵】或者【调虎离山】使用。",
      useablePhase: [GamePhase.MAIN_PHASE, GamePhase.SEND_PHASE_START],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_HUN_SHUI_MO_YU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_HUN_SHUI_MO_YU_TOC);
  }

  onUse(gui: GameManager) {
    const data = gui.data.selfPlayer.getTagData(TagName.CARD_NAME_REPLACED);
    if (gui.data.gamePhase === GamePhase.MAIN_PHASE) {
      PlayerAction.addStep({
        step: PlayerActionStepName.SELECT_HAND_CARDS,
        data: {
          tooltipText: "请选择一张手牌当做【调虎离山】使用",
          enabled: () => gui.selectedHandCards.list.length > 0,
          filter: (card) => {
            if (data && data.cardTypeA === card.type) {
              return CardUsableStatus.UNUSABLE;
            } else {
              return CardUsableStatus.USABLE;
            }
          },
        },
      }).addStep({
        step: new PlayerActionStep({
          handler: (data, { next, passOnPrev }) => {
            passOnPrev(() => {
              const card = gui.data.createCardWithNewType(gui.selectedHandCards.list[0], CardType.DIAO_HU_LI_SHAN);
              card.onPlay(gui);
              this.gameObject.isOn = false;
              next();
            });
          },
        }),
      });
    } else if (gui.data.gamePhase === GamePhase.SEND_PHASE_START) {
      PlayerAction.addStep({
        step: PlayerActionStepName.SELECT_HAND_CARDS,
        data: {
          tooltipText: "请选择一张手牌当做【欲擒故纵】使用",
          enabled: () => gui.selectedHandCards.list.length > 0,
          filter: (card) => {
            if (data && data.cardTypeA === card.type) {
              return CardUsableStatus.UNUSABLE;
            } else {
              return CardUsableStatus.USABLE;
            }
          },
        },
      }).addStep({
        step: new PlayerActionStep({
          handler: (data, { next, passOnPrev }) => {
            passOnPrev(() => {
              const card = gui.data.createCardWithNewType(gui.selectedHandCards.list[0], CardType.YU_QIN_GU_ZONG);
              card.onPlay(gui);
              this.gameObject.isOn = false;
              next();
            });
          },
        }),
      });
    }
  }

  onEffect(gameData: GameData, { playerId }: skill_hun_shui_mo_yu_toc) {
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
