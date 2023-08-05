import {
  skill_du_ji_a_toc,
  skill_du_ji_b_toc,
  skill_du_ji_c_toc,
  skill_wait_for_du_ji_b_toc,
} from "../../../../protobuf/proto";
import { NetworkEventCenter, GameEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { CardColor } from "../../Card/type";
import { Character } from "../../../Components/Chatacter/Character";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { ActiveSkill } from "../../../Components/Skill/Skill";
import { CharacterStatus } from "../../Chatacter/type";

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

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择两名角色`);
    gui.gameLayer.startSelectPlayers({
      num: 2,
      filter: (player) => player.id !== 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_A_TOS, {
            targetPlayerIds: gui.selectedPlayers.list.map((player) => player.id),
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedPlayers.list.length === 2,
      },
      {
        text: "取消",
        onclick: () => {
          gui.uiLayer.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
          this.gameObject.isOn = false;
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, targetPlayerIds, cards }: skill_du_ji_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const targetPlayer1 = gameData.playerList[targetPlayerIds[0]];
    const targetPlayer2 = gameData.playerList[targetPlayerIds[1]];

    const card1 = gameData.playerRemoveHandCard(targetPlayer1, cards[0]);
    const card2 = gameData.playerRemoveHandCard(targetPlayer2, cards[1]);

    let blackCount = 0;

    if (Card.hasColor(card1, CardColor.BLACK)) {
      gameData.playerAddHandCard(targetPlayer2, card1);
      ++blackCount;

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: targetPlayer2,
        card: card1,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer1 },
      });
    } else {
      gameData.playerAddHandCard(player, card1);

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: card1,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer1 },
      });
    }
    if (Card.hasColor(card2, CardColor.BLACK)) {
      gameData.playerAddHandCard(targetPlayer1, card2);
      ++blackCount;

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: targetPlayer1,
        card: card2,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer2 },
      });
    } else {
      gameData.playerAddHandCard(player, card2);

      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: player,
        card: card2,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player: targetPlayer2 },
      });
    }

    const cardList = cards.map((card) => gameData.createCard(card));
    const tags = targetPlayerIds.map((id) => gameLog.formatPlayer(gameData.playerList[id]));

    GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
      skill: this,
      handler: "showDrawnCard",
      params: {
        cardList,
        tags,
      },
    });

    if (blackCount === 0) {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【毒计】`));
  }

  showDrawnCard(gui: GameManager, params) {
    const { cardList, tags } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "【毒计】展示抽到的手牌",
      limit: 0,
      cardList,
      tags,
      buttons: [
        {
          text: "关闭",
          onclick: () => {
            showCardsWindow.hide();
          },
        },
      ],
    });
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

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChoosePlayerToDo",
        params: {
          targetPlayerIds,
          cardIds,
        },
      });
    }
  }

  promptChoosePlayerToDo(gui: GameManager, params) {
    const { targetPlayerIds, cardIds } = params;
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一个抽取黑色牌的角色，让他选择一项");
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => targetPlayerIds.indexOf(player.id) !== -1,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          const selectedPlayer = gui.selectedPlayers.list[0];
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_B_TOS, {
            enable: true,
            cardId: cardIds[targetPlayerIds.indexOf(selectedPlayer.id)],
            seq: gui.seq,
          });
        },
        enabled: () => gui.selectedPlayers.list.length > 0,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_B_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
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

      if (waitingPlayerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "promptSelectPlayer",
        });
      }

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}让${gameLog.formatPlayer(waitingPlayer)}选择一项`));
    }
  }

  promptSelectPlayer(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择将牌置入谁的情报区");
    tooltip.buttons.setButtons([
      {
        text: "自己",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_C_TOS, {
            inFrontOfMe: true,
            seq: gui.seq,
          });
        },
      },
      {
        text: "对方",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_DU_JI_C_TOS, {
            inFrontOfMe: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectC(gameData: GameData, { playerId, waitingPlayerId, targetPlayerId, card }: skill_du_ji_c_toc) {
    const gameLog = gameData.gameLog;
    const waitingPlayer = gameData.playerList[waitingPlayerId];
    const targetPlayer = gameData.playerList[targetPlayerId];

    const handCard = gameData.playerRemoveHandCard(waitingPlayer, card);
    targetPlayer.addMessage(handCard);

    GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
      player: targetPlayer,
      message: handCard,
      from: { location: CardActionLocation.PLAYER_HAND_CARD, player: waitingPlayer },
    });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(waitingPlayer)}把${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
          targetPlayer
        )}的情报区`
      )
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
