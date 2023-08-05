import { ActiveSkill } from "../../../Components/Skill/Skill";
import { Character } from "../../../Components/Chatacter/Character";
import { skill_yi_hua_jie_mu_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { CardActionLocation, GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { GameManager } from "../../../Manager/GameManager";
import { CharacterStatus } from "../../Chatacter/type";

export class YiHuaJieMu extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "移花接木",
      character,
      description:
        "争夺阶段，你可以翻开此角色牌，然后从一名角色的情报区选择一张情报，将其置入另一名角色的情报区，若如此做会让其收集三张或更多同色情报，则改为将该牌加入你的手牌。",
      useablePhase: [GamePhase.FIGHT_PHASE],
    });
  }

  get useable() {
    return this.character.status === CharacterStatus.FACE_DOWN;
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_YI_HUA_JIE_MU_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_YI_HUA_JIE_MU_TOC);
  }

  async onUse(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择要获取情报的角色`);
    const fromPlayer = await (() =>
      new Promise((resolve: (player: Player) => void, reject) => {
        gui.gameLayer.startSelectPlayers({
          num: 1,
          filter: (player) => {
            return player.messageCounts.total > 0;
          },
          onSelect: (player) => {
            gui.gameLayer.pauseSelectPlayers();
            resolve(player);
          },
        });
      }))();

    const cardId = await (() =>
      new Promise((resolve: (cardId: number) => void, reject) => {
        gui.showCardsWindow.show({
          title: "请选择一张情报",
          limit: 1,
          cardList: fromPlayer.getMessagesCopy(),
          buttons: [
            {
              text: "确定",
              onclick: () => {
                const id = gui.showCardsWindow.selectedCards.list[0].id;
                gui.showCardsWindow.hide();
                gui.gameLayer.stopSelectPlayers();
                resolve(id);
              },
              enabled: () => !!gui.showCardsWindow.selectedCards.list.length,
            },
          ],
        });
      }))();

    tooltip.setText("请选择把情报置入另一名角色的情报区");

    let toPlayer;
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => {
        return player !== fromPlayer;
      },
      onSelect: (player) => {
        toPlayer = player;
      },
    });

    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_YI_HUA_JIE_MU_TOS, {
            fromPlayerId: fromPlayer.id,
            cardId,
            toPlayerId: toPlayer.id,
            seq: gui.seq,
          });
        },
        enabled: () => {
          return !!gui.selectedPlayers.list.length;
        },
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

  onEffect(gameData: GameData, { playerId, fromPlayerId, toPlayerId, cardId, joinIntoHand }: skill_yi_hua_jie_mu_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const gameLog = gameData.gameLog;
    const player = gameData.playerList[playerId];
    const fromPlayer = gameData.playerList[fromPlayerId];
    const toPlayer = gameData.playerList[toPlayerId];
    const message = fromPlayer.removeMessage(cardId);
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【移花接木】`));

    if (joinIntoHand) {
      gameData.playerAddHandCard(player, message);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });
      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(fromPlayer)}的情报【${gameLog.formatCard(message)}】加入${gameLog.formatPlayer(
            player
          )}的手牌`
        )
      );
    } else {
      toPlayer.addMessage(message);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player,
        message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });

      gameLog.addData(
        new GameLog(
          `${gameLog.formatPlayer(fromPlayer)}的情报${gameLog.formatCard(message)}置入${gameLog.formatPlayer(
            toPlayer
          )}的情报区`
        )
      );
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
