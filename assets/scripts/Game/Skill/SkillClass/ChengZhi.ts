import { skill_cheng_zhi_toc, skill_wait_for_cheng_zhi_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Character } from "../../Character/Character";
import { GameLog } from "../../GameLog/GameLog";
import { createIdentity } from "../../Identity";
import { Identity } from "../../Identity/Identity";
import { IdentityType } from "../../Identity/type";
import { Player } from "../../Player/Player";
import { TriggerSkill } from "../Skill";

export class ChengZhi extends TriggerSkill {
  private identity: Identity;

  constructor(character: Character) {
    super({
      name: "承志",
      character,
      description:
        "一名其他角色死亡前，若此角色牌已翻开，则你获得其所有手牌，并查看其身份牌，你可以获得该身份牌，并将你原本的身份牌面朝下移出游戏。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CHENG_ZHI_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_CHENG_ZHI_TOC,
      (data) => {
        this.waitingForUse(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CHENG_ZHI_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_WAIT_FOR_CHENG_ZHI_TOC);
  }

  waitingForUse(
    gameData: GameData,
    { playerId, diePlayerId, cards, identity, secretTask, waitingSecond, seq }: skill_wait_for_cheng_zhi_toc
  ) {
    const player = gameData.playerList[playerId];
    const diePlayer = gameData.playerList[diePlayerId];
    const gameLog = gameData.gameLog;

    let handCards;
    if (playerId === 0) {
      diePlayer.removeAllHandCards();
      handCards = cards.map((card) => gameData.createCard(card));
      this.identity = createIdentity(identity as number, secretTask as number);
    } else {
      handCards = diePlayer.removeAllHandCards();
      if (diePlayerId === 0) {
        gameData.handCardList.removeAllData();
      }
    }
    gameData.playerAddHandCard(player, handCards);

    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        cards: handCards,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: diePlayer },
      });
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【承志】`));
    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}获得【${diePlayer.seatNumber + 1}号】${
          diePlayer.character.name
        }的手牌并查看其身份`
      )
    );

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.USE_SKILL,
      seq: seq,
    });
  }

  onTrigger(gameData: GameData, params): void {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`该角色的身份是${this.identity.name}，是否获得该角色的身份牌？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CHENG_ZHI_TOS, {
            enable: true,
            seq: gameData.gameObject.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CHENG_ZHI_TOS, {
            enable: false,
            seq: gameData.gameObject.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { playerId, diePlayerId, enable }: skill_cheng_zhi_toc) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const diePlayer = gameData.playerList[diePlayerId];
      const gameLog = gameData.gameLog;

      const noIdentity = createIdentity(IdentityType.HAS_NO_IDENTITY);
      diePlayer.confirmIdentity(noIdentity);

      if (playerId === 0) {
        player.confirmIdentity(this.identity);
        gameData.gameObject.setSelfIdentityUI();
      } else if (diePlayerId === 0) {
        gameData.gameObject.setSelfIdentityUI();
      } else {
        player.setIdentityList(diePlayer.identityList);
      }

      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}获得【${diePlayer.seatNumber + 1}号】${
            diePlayer.character.name
          }的身份`
        )
      );
    }
  }
}
