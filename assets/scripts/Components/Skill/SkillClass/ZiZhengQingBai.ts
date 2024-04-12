import { skill_zi_zheng_qing_bai_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { Card } from "../../Card/Card";
import { Lurker } from "../../Identity/IdentityClass/Lurker";
import { Agent } from "../../Identity/IdentityClass/Agent";
import { MysteriousPerson } from "../../Identity/IdentityClass/MysteriousPerson";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { IdentityType } from "../../Identity/type";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class ZiZhengQingBai extends ActiveSkill {
  private usageCount: number = 0;

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "自证清白",
      character,
      description: "出牌阶段限一次，你可以弃置一张与自己身份颜色不同的手牌，然后摸两张牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_ZI_ZHENG_QING_BAI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_ZI_ZHENG_QING_BAI_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        tooltipText: "请选择一张手牌丢弃",
        filter: (card: Card) => {
          const identity = gui.data.selfPlayer.identityList[0];
          if (identity instanceof Lurker) {
            if (Card.hasColor(card, CardColor.RED)) {
              return CardUsableStatus.UNUSABLE;
            } else {
              return CardUsableStatus.USABLE;
            }
          } else if (identity instanceof Agent) {
            if (Card.hasColor(card, CardColor.BLUE)) {
              return CardUsableStatus.UNUSABLE;
            } else {
              return CardUsableStatus.USABLE;
            }
          } else if (identity instanceof MysteriousPerson) {
            return CardUsableStatus.USABLE;
          }
        },
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_ZI_ZHENG_QING_BAI_TOS, {
        cardId: data[0].cards[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { playerId, colors }: skill_zi_zheng_qing_bai_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (colors.indexOf(<number>CardColor.RED) !== -1) {
      player.ruleOutIdentity(IdentityType.RED);
    } else if (colors.indexOf(<number>CardColor.BLUE) !== -1) {
      player.ruleOutIdentity(IdentityType.BLUE);
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
