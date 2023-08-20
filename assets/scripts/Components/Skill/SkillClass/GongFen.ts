import { skill_gong_fen_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../../Components/Chatacter/Character";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { ActiveSkill } from "../../../Components/Skill/Skill";
import { CharacterStatus } from "../../Chatacter/type";
import { Card } from "../../Card/Card";
import { CardColor } from "../../Card/type";

export class GongFen extends ActiveSkill {
  private count = 0;
  private total = 0;

  constructor(character: Character) {
    super({
      name: "共焚",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后从你开始，逆时针每名玩家翻开牌堆顶的一张牌并置入自己的情报区，若翻开的是红色或蓝色牌，则改为加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_GONG_FEN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_GONG_FEN_TOC);
  }

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用【共焚】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_GONG_FEN_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          gui.uiLayer.playerActionManager.switchToDefault();
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, targetPlayerId, card }: skill_gong_fen_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    if (this.count === 0) {
      ProcessEventCenter.emit(ProcessEvent.STOP_COUNT_DOWN);

      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
      for (let player of gameData.playerList) {
        if (player.isAlive) {
          ++this.total;
        }
      }

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【共焚】`));
    }

    const topCard = gameData.createCard(card);
    gameLog.addData(new GameLog(`【共焚】翻开牌堆顶的牌${gameLog.formatCard(topCard)}`));

    if (topCard.color.length === 1 && Card.hasColor(topCard, CardColor.BLACK)) {
      targetPlayer.addMessage(topCard);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: topCard,
      });
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}把${gameLog.formatCard(topCard)}置入情报区`));
    } else {
      gameData.playerAddHandCard(player, topCard);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: topCard,
      });
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${gameLog.formatCard(topCard)}加入手牌`));
    }

    ++this.count;
    if (this.count === this.total) {
      this.count = 0;
      this.total = 0;
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }
  }
}
