import { skill_ding_lun_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { CharacterStatus } from "../../Chatacter/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { UnknownCard } from "../../Card/CardClass/UnknownCard";
import { CardStatus } from "../../Card/type";

export class DingLun extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "定论",
      character,
      description:
        "争夺阶段，若待收情报在你面前，你可以翻开此角色牌，强制结束争夺阶段。若如此做会让你收集三张或更多同色情报，则改为将待收情报加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DING_LUN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_DING_LUN_TOC);
  }

  canUse(gui: GameManager) {
    return gui.data.messagePlayerId === gui.data.selfPlayer.id;
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete(() => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_DING_LUN_TOS, {
        seq: gui.seq,
      });
    });
  }

  async onEffect(gameData: GameData, { playerId, card, joinIntoHand }: skill_ding_lun_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];

    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, {
      player,
      skill: this,
    });

    if (joinIntoHand) {
      let message = gameData.messageInTransmit;
      if (message instanceof UnknownCard || message.status === CardStatus.FACE_DOWN) {
        message = gameData.createMessage(card);
        message.gameObject = gameData.messageInTransmit.gameObject;
        gameData.messageInTransmit = message;
        await message.flip();
      }

      gameData.playerAddHandCard(player, message);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER, player },
      });
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把待收情报${gameLog.formatCard(message)}加入手牌`));
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, {
      player,
      skill: this,
    });
  }
}
