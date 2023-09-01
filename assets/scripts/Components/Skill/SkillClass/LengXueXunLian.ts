import { skill_leng_xue_xun_lian_a_toc, skill_leng_xue_xun_lian_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, GamePhase, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Character } from "../../Chatacter/Character";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { ActiveSkill } from "../Skill";
import { Card } from "../../Card/Card";
import { CardColor, CardDirection, CardType } from "../../Card/type";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { copyCard } from "../../Card";

export class LengXueXunLian extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "冷血训练",
      character,
      description:
        "你需要传出情报时，可以改为展示牌堆顶的两张牌，从中选择一张（若有黑色牌则必须选择一张黑色牌）作为情报面朝上传出，并锁定一名角色，且令所有角色本回合中不能使用【调包】，之后将未选择的那张加入你的手牌。",
      useablePhase: [GamePhase.SEND_PHASE_START],
    });
  }

  get useable() {
    return true;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_LENG_XUE_XUN_LIAN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_LENG_XUE_XUN_LIAN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_LENG_XUE_XUN_LIAN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_LENG_XUE_XUN_LIAN_B_TOC);
  }

  onUse(gui: GameManager) {
    PlayerAction.onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.SKILL_LENG_XUE_XUN_LIAN_A_TOS, {
        seq: gui.seq,
      });
    });
  }

  onEffectA(gameData: GameData, { playerId, cards, waitingSecond, seq }: skill_leng_xue_xun_lian_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const cardList = cards.map((card) => gameData.createCard(card));

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【冷血训练】，展示牌堆顶的两张牌`));

    ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
      playerId,
      second: waitingSecond,
      type: WaitingType.HANDLE_SKILL,
      seq: seq,
    });

    if (playerId === 0) {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "promptChooseCard",
        params: {
          cardList,
        },
      });
    } else {
      GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
        skill: this,
        handler: "showCards",
        params: {
          cardList,
        },
      });
    }
  }

  promptChooseCard(gui: GameManager, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;

    PlayerAction.addStep({
      step: new PlayerActionStep({
        handler: (data, { next, prev }) => {
          showCardsWindow.show({
            title: "请选择一张牌作为情报传出",
            limit: 1,
            cardList,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  const sendCard = copyCard(showCardsWindow.selectedCards.list[0]);
                  showCardsWindow.hide();
                  gui.uiLayer.doSendMessage({ message: sendCard, forceLock: true });
                  PlayerAction.onComplete((data) => {
                    let d: any = {};
                    for (let item of data) {
                      d = { ...d, ...item };
                    }
                    NetworkEventCenter.emit(NetworkEventToS.SKILL_LENG_XUE_XUN_LIAN_B_TOS, {
                      sendCardId: d.sendCard.id,
                      lockPlayerId: d.lockPlayerId,
                      targetPlayerId: d.targetPlayerId,
                      seq: gui.seq,
                    });
                  });
                  next({ sendCard });
                },
                enabled: () => {
                  if (showCardsWindow.selectedCards.list.length <= 0) return false;
                  return Card.hasColor(cardList, CardColor.BLACK)
                    ? Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK)
                    : true;
                },
              },
            ],
          });
        },
      }),
    }).start();
  }

  showCards(gui: GameManager, params) {
    const { cardList } = params;
    const showCardsWindow = gui.showCardsWindow;

    showCardsWindow.show({
      title: "【冷血训练】展示牌堆顶",
      limit: 0,
      cardList,
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

  onEffectB(
    gameData: GameData,
    { sendCard, senderId, targetPlayerId, lockPlayerId, handCard }: skill_leng_xue_xun_lian_b_toc
  ) {
    const player = gameData.playerList[senderId];
    const card = gameData.createCard(handCard);
    const gameLog = gameData.gameLog;

    ProcessEventCenter.emit(ProcessEvent.SEND_MESSAGE, {
      card: sendCard,
      senderId: senderId,
      targetPlayerId: targetPlayerId,
      lockPlayerIds: [lockPlayerId],
      direction: sendCard.cardDir,
    });

    gameData.playerAddHandCard(player, card);

    GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
      player,
      card,
      from: { location: CardActionLocation.DECK },
    });

    gameData.cardBanned = true;
    gameData.bannedCardTypes.push(CardType.DIAO_BAO);
    GameEventCenter.once(GameEvent.GAME_TURN_CHANGE, () => {
      gameData.cardBanned = false;
      gameData.bannedCardTypes = [];
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}令所有角色本回合中不能使用【调包】`));
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}把${gameLog.formatCard(card)}加入手牌`));

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
