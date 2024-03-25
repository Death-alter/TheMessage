import { skill_you_di_shen_ru_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { Lurker } from "../../Identity/IdentityClass/Lurker";
import { Agent } from "../../Identity/IdentityClass/Agent";
import { Card } from "../../Card/Card";
import { CardColor } from "../../Card/type";
import { TagName } from "../../../type";

export class YouDiShenRu extends ActiveSkill {
  private usageCount: number = 0;
  private isSelfTurn: boolean = false;

  get useable() {
    return this.usageCount === 0 && this.isSelfTurn;
  }

  constructor(character: Character) {
    super({
      name: "诱敌深入",
      character,
      description:
        "每局游戏限一次，你的传递阶段，你改为将一张手牌作为情报面朝上传出。身份与该情报颜色相同的角色必须选择接收该情报，身份与该情报颜色不同的角色不能选择接收该情报。",
      useablePhase: [GamePhase.SEND_PHASE_START],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YOU_DI_SHEN_RU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onTurnChange, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YOU_DI_SHEN_RU_TOC);
    GameEventCenter.off(GameEvent.GAME_TURN_CHANGE, this.onTurnChange, this);
  }

  onTurnChange({ turnPlayer }) {
    this.isSelfTurn = turnPlayer.id === 0;
  }

  onUse(gui: GameManager) {
    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          const tooltip = gui.tooltip;
          tooltip.setText(`请选择一张手牌作为情报传出`);
          gui.gameLayer.startSelectHandCards({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                const sendCard = gui.selectedHandCards.list[0];
                gui.uiLayer.doSendMessage({ message: sendCard });
                PlayerAction.onComplete((data) => {
                  let d: any = {};
                  for (const item of data) {
                    d = { ...d, ...item };
                  }
                  NetworkEventCenter.emit(NetworkEventToS.SKILL_YOU_DI_SHEN_RU_TOS, {
                    cardId: d.sendCard.id,
                    targetPlayerId: d.targetPlayerId,
                    lockPlayerId: d.lockPlayerId,
                    cardDir: d.direction != null ? d.direction : d.sendCard.direction,
                    seq: gui.seq,
                  });
                });
                next({ sendCard });
              },
              enabled: () => {
                return gui.selectedHandCards.list.length === 1;
              },
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

  onEffect(gameData: GameData, { playerId, card, targetPlayerId, lockPlayerIds, cardDir }: skill_you_di_shen_ru_toc) {
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    ProcessEventCenter.emit(ProcessEvent.SEND_MESSAGE, {
      card,
      senderId: playerId,
      targetPlayerId,
      lockPlayerIds,
      direction: cardDir,
      fromHand: true,
    });

    const message = gameData.createCard(card);

    if (gameData.identity instanceof Lurker) {
      if (Card.hasColor(message, CardColor.RED)) {
        gameData.selfPlayer.addTag(TagName.MUST_RECEIVE_MESSAGE);
      } else {
        gameData.selfPlayer.addTag(TagName.CANNOT_RECEIVE_MESSAGE);
      }
    } else if (gameData.identity instanceof Agent) {
      if (Card.hasColor(message, CardColor.BLUE)) {
        gameData.selfPlayer.addTag(TagName.MUST_RECEIVE_MESSAGE);
      } else {
        gameData.selfPlayer.addTag(TagName.CANNOT_RECEIVE_MESSAGE);
      }
    }

    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      gameData.selfPlayer.removeTag(TagName.MUST_RECEIVE_MESSAGE);
      gameData.selfPlayer.removeTag(TagName.CANNOT_RECEIVE_MESSAGE);
    });

    ++this.usageCount;
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
