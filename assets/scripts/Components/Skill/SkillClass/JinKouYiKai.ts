import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_jin_kou_yi_kai_a_toc, skill_jin_kou_yi_kai_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { Card } from "../../../Components/Card/Card";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";

export class JinKouYiKai extends ActiveSkill {
  private usageCount: number = 0;
  private isSelfTurn: boolean = false;
  private topCard: Card;

  get useable() {
    return this.usageCount === 0 && this.isSelfTurn;
  }

  constructor(character: Character) {
    super({
      name: "金口一开",
      character,
      description:
        "你的争夺阶段限一次，你可以查看牌堆顶的一张牌，然后选择一项：\n♦你摸一张牌\n♦将牌堆顶的一张牌和待收情报面朝下互换。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIN_KOU_YI_KAI_B_TOC);
    GameEventCenter.off(GameEvent.FIGHT_PHASE_END, this.resetUsageCount, this);
    GameEventCenter.off(GameEvent.GAME_TURN_CHANGE, this.onTurnChange, this);
  }

  resetUsageCount() {
    this.usageCount = 0;
  }

  onTurnChange({ turnPlayer }) {
    this.isSelfTurn = turnPlayer.id === 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_jin_kou_yi_kai_a_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      this.topCard = gameData.createCard(card);
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "checkDeckTopCardAndChoose",
        params: {
          card: this.topCard,
        },
      });
    }
  }

  checkDeckTopCardAndChoose(gui: GameManager, params) {
    const { card } = params;
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "牌堆顶的牌",
      limit: 0,
      cardList: [card],
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            showCardsWindow.hide();
          },
        },
      ],
    });

    tooltip.setText(`请选择一项`);
    tooltip.buttons.setButtons([
      {
        text: "摸一张牌",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_B_TOS, {
            exchange: false,
            seq: gui.seq,
          });
        },
      },
      {
        text: "交换情报",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIN_KOU_YI_KAI_B_TOS, {
            exchange: true,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectB(gameData: GameData, { playerId, exchange }: skill_jin_kou_yi_kai_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    if (exchange) {
      const card = this.topCard || gameData.createCard();
      const oldMessage = gameData.messageInTransmit;
      gameData.messageInTransmit = card;
      GameEventCenter.emit(GameEvent.MESSAGE_REPLACED, {
        message: card,
        oldMessage,
        messagePlayer: gameData.playerList[gameData.messagePlayerId],
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}选择将牌堆顶的牌和待收情报互换`));
    } else {
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}选择摸一张牌`));
    }

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
