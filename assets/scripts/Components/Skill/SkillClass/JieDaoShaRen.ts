import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_jie_dao_sha_ren_a_toc, skill_jie_dao_sha_ren_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";

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

  onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("请选择一名角色");
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => player.id !== 0 && player.handCardCount > 0,
    });
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_A_TOS, {
            targetPlayerId: gui.selectedPlayers.list[0].id,
            seq: gui.seq,
          });
        },
        enabled: () => !!gui.selectedPlayers.list.length,
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

  onEffectA(gameData: GameData, { playerId, card, targetPlayerId, waitingSecond, seq }: skill_jie_dao_sha_ren_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

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

    if (playerId !== 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showCard",
        params: {
          card: gameData.createCard(card),
        },
      });
    }

    if (waitingSecond > 0) {
      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "promptChooseToDo",
          params: {},
        });
      }
    } else {
      GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
    }

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}使用技能【借刀杀人】，抽取${gameLog.formatPlayer(targetPlayer)}的一张手牌并展示`
      )
    );
  }

  promptChooseToDo(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("是否将抽到的牌置入一名角色的情报区？");
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          tooltip.setText("请选择一名角色");
          gui.gameLayer.startSelectPlayers({
            num: 1,
          });
          tooltip.buttons.setButtons([
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_B_TOS, {
                  enable: true,
                  targetPlayerId: gui.selectedPlayers.list[0].id,
                  seq: gui.seq,
                });
              },
              enabled: () => !!gui.selectedPlayers.list.length,
            },
          ]);
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIE_DAO_SHA_REN_B_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  showCard(gui: GameManager, params) {
    const { card } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "【借刀杀人】展示抽取的牌",
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
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, card, enable }: skill_jie_dao_sha_ren_b_toc) {
    if (enable) {
      const gameLog = gameData.gameLog;
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];

      const handCard = gameData.playerRemoveHandCard(player, card);
      targetPlayer.addMessage(handCard);

      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(player)}将${gameLog.formatCard(handCard)}置入${gameLog.formatPlayer(
            targetPlayer
          )}的情报区`
        )
      );
    }
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
