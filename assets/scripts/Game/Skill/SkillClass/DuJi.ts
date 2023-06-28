import {
  skill_du_ji_a_toc,
  skill_du_ji_b_toc,
  skill_du_ji_c_toc,
  skill_wait_for_du_ji_b_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../../Card/Card";
import { CardColor } from "../../Card/type";
import { Character } from "../../Character/Character";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";

export class DuJi extends ActiveSkill {
  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  constructor(character: Character) {
    super({
      name: "毒计",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后指定两名其他角色，令他们互相抽取对方的一张手牌并展示之，你将展示的牌加入你的手牌，若展示的是黑色牌，你可以改为令抽取者选择一项：\n♦将其置入自己的情报区。\n♦将其置入对方的情报区。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_WAIT_FOR_DU_JI_B_TOC,
      (data) => {
        this.waitingForUseB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_DU_JI_C_TOC,
      (data) => {
        this.onEffectC(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_DU_JI_C_TOC);
  }

  onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`请选择两名角色`);
    gameData.gameObject.startSelectPlayer({
      num: 2,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_A_TOS, {
            targetPlayerIds: gameData.gameObject.selectedPlayers.list.map((player) => player.id),
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => gameData.gameObject.selectedPlayers.list.length === 2,
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

  onEffectA(gameData: GameData, { playerId, targetPlayerIds, cards }: skill_du_ji_a_toc) {
    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const showCardsWindow = gameData.gameObject.showCardsWindow;
    const targetPlayer1 = gameData.playerList[targetPlayerIds[0]];
    const targetPlayer2 = gameData.playerList[targetPlayerIds[1]];

    const card1 = gameData.playerRemoveHandCard(targetPlayer1, cards[0]);
    const card2 = gameData.playerRemoveHandCard(targetPlayer2, cards[1]);

    let blackCount = 0;

    if (Card.hasColor(card1, CardColor.BLACK)) {
      gameData.playerAddHandCard(targetPlayer2, card1);
      if (gameData.gameObject) {
        gameData.gameObject.cardAction.addCardToHandCard({
          player: targetPlayer2,
          card: card1,
          from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer1 },
        });
      }
      ++blackCount;
    } else {
      gameData.playerAddHandCard(player, card1);
      if (gameData.gameObject) {
        gameData.gameObject.cardAction.addCardToHandCard({
          player,
          card: card1,
          from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer1 },
        });
      }
    }
    if (Card.hasColor(card2, CardColor.BLACK)) {
      gameData.playerAddHandCard(targetPlayer1, card2);
      if (gameData.gameObject) {
        gameData.gameObject.cardAction.addCardToHandCard({
          player: targetPlayer1,
          card: card2,
          from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer2 },
        });
      }
      ++blackCount;
    } else {
      gameData.playerAddHandCard(player, card2);
      if (gameData.gameObject) {
        gameData.gameObject.cardAction.addCardToHandCard({
          player: player,
          card: card2,
          from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer2 },
        });
      }
    }

    showCardsWindow.show({
      title: "【毒计】展示抽到的手牌",
      limit: 0,
      cardList: cards.map((card) => gameData.createCard(card)),
      tags: targetPlayerIds.map((id) => {
        const player = gameData.playerList[id];
        return `【${player.seatNumber + 1}号】${player.character.name}`;
      }),
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            showCardsWindow.hide();
          },
        },
      ],
    });

    if (blackCount === 0) {
      if (playerId === 0) {
        this.gameObject.isOn = false;
      }
    } else {
      this.gameObject?.lock();
    }

    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【毒计】`));
  }

  waitingForUseB(
    gameData: GameData,
    { playerId, targetPlayerIds, cardIds, waitingSecond, seq }: skill_wait_for_du_ji_b_toc
  ) {
    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId: playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0 && gameData.gameObject) {
      const tooltip = gameData.gameObject.tooltip;
      tooltip.setText("请选择一个抽取黑色牌的角色，让他选择一项");
      gameData.gameObject.startSelectPlayer({
        num: 1,
        filter: (player) => targetPlayerIds.indexOf(player.id) !== -1,
      });
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            const selectedPlayer = gameData.gameObject.selectedPlayers.list[0];
            NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_B_TOS, {
              enable: true,
              cardId: cardIds[targetPlayerIds.indexOf(selectedPlayer.id)],
              seq: seq,
            });
          },
          enabled: () => gameData.gameObject.selectedPlayers.list.length > 0,
        },
        {
          text: "取消",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_B_TOS, {
              enable: false,
              seq: seq,
            });
          },
        },
      ]);
    }
  }

  onEffectB(
    gameData: GameData,
    { playerId, enable, waitingPlayerId, targetPlayerId, card, waitingSecond, seq }: skill_du_ji_b_toc
  ) {
    if (enable) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: waitingPlayerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      const gameLog = gameData.gameLog;
      const player = gameData.playerList[playerId];
      const waitingPlayer = gameData.playerList[waitingPlayerId];

      if (waitingPlayerId === 0 && gameData.gameObject) {
        const tooltip = gameData.gameObject.tooltip;
        tooltip.setText("请选择将牌置入谁的情报区");
        tooltip.buttons.setButtons([
          {
            text: "自己",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_C_TOS, {
                inFrontOfMe: true,
                seq: seq,
              });
            },
          },
          {
            text: "对方",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_C_TOS, {
                inFrontOfMe: false,
                seq: seq,
              });
            },
          },
        ]);
      }

      gameLog.addData(
        new GameLog(
          `【${player.seatNumber + 1}号】${player.character.name}让【${waitingPlayer.seatNumber + 1}号】${
            waitingPlayer.character.name
          }选择一项`
        )
      );
    }
  }

  onEffectC(gameData: GameData, { playerId, waitingPlayerId, targetPlayerId, card }: skill_du_ji_c_toc) {
    const gameLog = gameData.gameLog;
    const waitingPlayer = gameData.playerList[waitingPlayerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const handCard = gameData.playerRemoveHandCard(waitingPlayer, card);
    targetPlayer.addMessage(handCard);
    
    if (gameData.gameObject) {
      gameData.gameObject.cardAction.addCardToMessageZone({
        player: targetPlayer,
        card: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: waitingPlayer },
      });
    }

    gameLog.addData(
      new GameLog(
        `【${waitingPlayer.seatNumber + 1}号】${waitingPlayer.character.name}把${gameLog.formatCard(handCard)}置入${
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
