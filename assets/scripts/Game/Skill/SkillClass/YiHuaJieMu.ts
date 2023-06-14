import { ActiveSkill } from "../Skill";
import { Character } from "../../Character/Character";
import { skill_yi_hua_jie_mu_toc } from "../../../../protobuf/proto";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { CardActionLocation, GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { CharacterStatus } from "../../Character/type";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";

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

  async onUse(gameData: GameData) {
    const tooltip = gameData.gameObject.tooltip;
    tooltip.setText(`请选择要获取情报的角色`);
    const fromPlayer = await (() =>
      new Promise((resolve: (player: Player) => void, reject) => {
        gameData.gameObject.startSelectPlayer({
          num: 1,
          filter: (player) => {
            return player.messageCounts.total > 0;
          },
          onSelect: (player) => {
            gameData.gameObject.selectedPlayers.lock();
            resolve(player);
          },
        });
      }))();

    const cardId = await (() =>
      new Promise((resolve: (cardId: number) => void, reject) => {
        gameData.gameObject.showCardsWindow.show({
          title: "请选择一张情报",
          limit: 1,
          cardList: fromPlayer.getMessagesCopy(),
          buttons: [
            {
              text: "确定",
              onclick: () => {
                const id = gameData.gameObject.showCardsWindow.selectedCards.list[0].id;
                gameData.gameObject.showCardsWindow.hide();
                gameData.gameObject.selectedPlayers.unlock();
                gameData.gameObject.clearSelectedPlayers();
                resolve(id);
              },
              enabled: () => !!gameData.gameObject.showCardsWindow.selectedCards.list.length,
            },
          ],
        });
      }))();

    tooltip.setText("请选择把情报置入另一名角色的情报区");

    let toPlayer;
    gameData.gameObject.startSelectPlayer({
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
            seq: gameData.gameObject.seq,
          });
        },
        enabled: () => {
          return !!gameData.gameObject.selectedPlayers.list.length;
        },
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

  onEffect(gameData: GameData, { playerId, fromPlayerId, toPlayerId, cardId, joinIntoHand }: skill_yi_hua_jie_mu_toc) {
    const gameLog = gameData.gameObject.gameLog;
    const player = gameData.playerList[playerId];
    const fromPlayer = gameData.playerList[fromPlayerId];
    const toPlayer = gameData.playerList[toPlayerId];
    const message = fromPlayer.removeMessage(cardId);
    gameLog.addData(new GameLog(`【${player.seatNumber + 1}号】${player.character.name}使用技能【移花接木】`));
    if (joinIntoHand) {
      player.addHandCard(message);
      gameData.gameObject.cardAction.addCardToHandCard({
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });
      gameLog.addData(
        new GameLog(
          `【${fromPlayer.seatNumber + 1}号】${fromPlayer.character.name}的情报【${gameLog.formatCard(
            message
          )}】加入【${player.seatNumber + 1}号】${player.character.name}的手牌`
        )
      );
    } else {
      toPlayer.addMessage(message);
      gameData.gameObject.cardAction.addCardToMessageZone({
        player,
        card: message,
        from: { location: CardActionLocation.PLAYER, player: fromPlayer },
      });
      gameLog.addData(
        new GameLog(
          `【${fromPlayer.seatNumber + 1}号】${fromPlayer.character.name}的情报【${gameLog.formatCard(
            message
          )}】置入【${toPlayer.seatNumber + 1}号】${toPlayer.character.name}的情报区`
        )
      );
    }
    
    if (playerId === 0) {
      this.gameObject.isOn = false;
    }
  }
}
