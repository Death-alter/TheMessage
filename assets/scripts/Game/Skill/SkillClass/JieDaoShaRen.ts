import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_jie_dao_sha_ren_a_toc, skill_jie_dao_sha_ren_b_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

export class JieDaoShaRen extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "借刀杀人",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后抽取另一名角色的一张手牌并展示之。若展示的牌是：黑色，则你可以将其置入一名角色的情报区，并将你的角色牌翻至面朝下；非黑色，则你摸一张牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIE_DAO_SHA_REN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIE_DAO_SHA_REN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIE_DAO_SHA_REN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIE_DAO_SHA_REN_B_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText("请选择一名角色");
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0 && player.handCardCount > 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_A_TOS, {
            targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => !!gameData.gameObject.selectedPlayers.list.length,
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }
  onEffectA(gameData: GameData, { playerId, card, targetPlayerId, waitingSecond, seq }: skill_jie_dao_sha_ren_a_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    if (waitingSecond > 0) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0 && gameData.gameObject) {
        this.gameObject?.lock();
        const tooltip = gameData.gameObject.tooltip;
        tooltip.setText("是否将抽到的牌置入一名角色的情报区？");
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              tooltip.setText("请选择一名角色");
              gameData.gameObject.startSelectPlayer({
                num: 1,
              });
              tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_B_TOS, {
                      enable: true,
                      targetPlayerId: gameData.gameObject.selectedPlayers.list[0].id,
                      seq,
                    });
                  },
                  enabled: () => !!gameData.gameObject.selectedPlayers.list.length,
                },
              ]);
            },
          },
          {
            text: "取消",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_B_TOS, {
                enable: false,
                seq,
              });
            },
          },
        ]);
      }
    }

    const handCard = gameData.playerRemoveHandCard(targetPlayer, card);
    gameData.playerAddHandCard(player, handCard);

    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        card: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer },
      });

      if (playerId !== 0) {
        gameData.gameObject.showCardsWindow.show({
          title: "【借刀杀人】展示抽取的牌",
          limit: 0,
          cardList: [gameData.createCard(card)],
          buttons: [
            {
              text: "关闭",
              onclick: () => {
                gameData.gameObject.showCardsWindow.hide();
              },
            },
          ],
        });
      }
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}使用技能【借刀杀人】，抽取【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的一张手牌并展示`
      )
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card }: skill_jie_dao_sha_ren_b_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const handCard = gameData.playerRemoveHandCard(player, card);
    targetPlayer.addMessage(handCard);

    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToMessageZone({
        player: targetPlayer,
        card: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });
    }

    gameLog.addData(
      new GameLog(
        `【${player.seatNumber + 1}号】${player.character.name}将${gameLog.formatCard(handCard)}置入【${
          targetPlayer.seatNumber + 1
        }号】${targetPlayer.character.name}的情报区`
      )
    );

    if (playerId === 0) {
      this.gameObject?.unlock();
      this.gameObject.isOn = false;
    }
  }
}
