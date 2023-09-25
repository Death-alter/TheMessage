import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { skill_tan_xu_bian_shi_a_toc, skill_tan_xu_bian_shi_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor, CardUsableStatus } from "../../Card/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Lurker } from "../../Identity/IdentityClass/Lurker";
import { Agent } from "../../Identity/IdentityClass/Agent";
import { Card } from "../../Card/Card";
import { IdentityType } from "../../Identity/type";

export class TanXuBianShi extends ActiveSkill {
  private usageCount: number = 0;
  private color: CardColor[];

  get useable() {
    return this.usageCount === 0;
  }

  constructor(character: Character) {
    super({
      name: "探虚辨实",
      character,
      description: "出牌阶段限一次，你可以交给一名角色一张手牌，该角色还你一张手牌，且必须优先选择含其身份颜色的牌。",
      useablePhase: [GamePhase.MAIN_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAN_XU_BIAN_SHI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_TAN_XU_BIAN_SHI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAN_XU_BIAN_SHI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_TAN_XU_BIAN_SHI_B_TOC);
    GameEventCenter.off(GameEvent.MAIN_PHASE_END, this.resetUsageCount, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
    })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          filter: (player) => {
            return player.id !== 0;
          },
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAN_XU_BIAN_SHI_A_TOS, {
          cardId: data[1].cards[0].id,
          targetPlayerId: data[0].players[0].id,
          seq: gui.seq,
        });
      });
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerId, card, waitingSecond, seq }: skill_tan_xu_bian_shi_a_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: targetPlayerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    const handCard = gameData.playerRemoveHandCard(player, card);
    gameData.playerAddHandCard(targetPlayer, handCard);
    this.color = handCard.color;

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player: targetPlayer,
      card: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: player },
    });

    if (targetPlayerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseHandCard",
        params: {
          player,
        },
      });
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}交给${gameLog.formatPlayer(targetPlayer)}一张手牌`));
  }

  promptChooseHandCard(gui: GameManager, params: { player: Player }) {
    const { player } = params;
    const tooltip = gui.tooltip;
    const gameLog = gui.gameLog;

    let flag = false;
    let text = "";
    let color;
    if (gui.data.identity instanceof Lurker) {
      if (Card.hasColor(gui.data.handCardList.list, CardColor.RED)) {
        flag = true;
        text = "红色";
        color = CardColor.RED;
      }
    } else if (gui.data.identity instanceof Agent) {
      if (Card.hasColor(gui.data.handCardList.list, CardColor.BLUE)) {
        flag = true;
        text = "蓝色";
        color = CardColor.BLUE;
      }
    }

    if (flag) {
      tooltip.setText(`请选择一张${text}手牌还给${gameLog.formatPlayer(player)}`);
    } else {
      tooltip.setText(`请选择一张手牌还给${gameLog.formatPlayer(player)}`);
    }

    PlayerAction.addStep({
      step: PlayerActionStepName.SELECT_HAND_CARDS,
      data: {
        filter: (card: Card) => {
          if (flag) {
            if (Card.hasColor(card, color)) {
              return CardUsableStatus.USABLE;
            } else {
              return CardUsableStatus.UNUSABLE;
            }
          } else {
            return CardUsableStatus.USABLE;
          }
        },
      },
    })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.SKILL_TAN_XU_BIAN_SHI_B_TOS, {
          cardId: data[0].cards[0].id,
          seq: gui.seq,
        });
      })
      .start();
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card }: skill_tan_xu_bian_shi_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const handCard = gameData.playerRemoveHandCard(targetPlayer, card);
    gameData.playerAddHandCard(player, handCard);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
    });
    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(targetPlayer)}还给${gameLog.formatPlayer(targetPlayer)}${gameLog.formatCard(handCard)}`
      )
    );

    if (this.color.indexOf(CardColor.RED) !== -1 && !Card.hasColor(handCard, CardColor.RED)) {
      targetPlayer.ruleOutIdentity(IdentityType.RED);
    }
    if (this.color.indexOf(CardColor.BLUE) !== -1 && !Card.hasColor(handCard, CardColor.BLUE)) {
      targetPlayer.ruleOutIdentity(IdentityType.BLUE);
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
