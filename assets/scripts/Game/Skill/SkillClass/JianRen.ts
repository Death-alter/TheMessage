import { skill_jian_ren_a_toc, skill_jian_ren_b_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { TriggerSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { CardActionLocation, WaitingType } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";
import { GameUI } from "../../../UI/Game/GameWindow/GameUI";

export class JianRen extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "坚韧",
      character,
      description:
        "你接收黑色情报后，可以展示牌堆顶的一张牌，若是黑色牌，则将展示的牌加入你的手牌，并从一名角色的情报区弃置一张黑色情报。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_REN_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_JIAN_REN_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_JIAN_REN_B_TOC);
  }

  onTrigger(gui: GameUI, params): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`你接收了黑色情报,是否使用【坚韧】？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_REN_A_TOS, {
            seq: gui.seq,
          });
        },
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffectA(gameData: GameData, { playerId, card, waitingSecond, seq }: skill_jian_ren_a_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
    
    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
      skill: this,
      handler: "showDeckTopCard",
      params: {
        card: gameData.createCard(card),
      },
    });
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【坚韧】`));

    const handCard = gameData.createCard(card);

    if (waitingSecond > 0) {
      gameData.playerAddHandCard(player, handCard);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: handCard,
        from: { location: CardActionLocation.DECK },
      });

      gameLog.addData(
        new GameLog(`${gameLog.formatPlayer(player)}把展示的牌${gameLog.formatCard(handCard)}加入手牌`)
      );

      ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
        playerId: playerId,
        second: waitingSecond,
        type: WaitingType.HANDLE_SKILL,
        seq: seq,
      });

      if (playerId === 0) {
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "promptSelectCard",
        });
      }
    }
  }

  showDeckTopCard(gui: GameUI, params) {
    const { card } = params;
    const showCardsWindow = gui.showCardsWindow;
    showCardsWindow.show({
      title: "展示牌堆顶的牌",
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

  promptSelectCard(gui: GameUI) {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    tooltip.setText("请选择一名角色弃置一张黑色情报");
    gui.startSelectPlayer({
      num: 1,
      filter: (player) => player.messageCounts[CardColor.BLACK] > 0,
      onSelect: (player) => {
        showCardsWindow.show({
          title: "请选择一张黑色情报弃置",
          limit: 1,
          cardList: player.getMessagesCopy(),
          buttons: [
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.SKILL_JIAN_REN_B_TOS, {
                  targetPlayerId: player.id,
                  cardId: showCardsWindow.selectedCards.list[0].id,
                  seq: gui.seq,
                });
                showCardsWindow.hide();
              },
              enabled: () =>
                showCardsWindow.selectedCards.list.length &&
                Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
            },
            {
              text: "取消",
              onclick: () => {
                gui.clearSelectedPlayers();
                showCardsWindow.hide();
              },
            },
          ],
        });
      },
    });
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, cardId }: skill_jian_ren_b_toc) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    const message = targetPlayer.removeMessage(cardId);

    GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, { player: targetPlayer, messageList: [message] });

    gameLog.addData(
      new GameLog(
        `${gameLog.formatPlayer(player)}从${gameLog.formatPlayer(targetPlayer)}的情报区弃置${gameLog.formatCard(
          message
        )}`
      )
    );
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
