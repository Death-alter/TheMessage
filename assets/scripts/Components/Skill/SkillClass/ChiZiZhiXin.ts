import { skill_chi_zi_zhi_xin_toc } from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { TriggerSkill } from "../Skill";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { Character } from "../../Chatacter/Character";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction";
import { PlayerReceiveMessage } from "../../../Event/GameEventType";
import { CardColor } from "../../Card/type";
import { Card } from "../../Card/Card";
import { CardActionLocation } from "../../../Manager/type";

export class ChiZiZhiXin extends TriggerSkill {
  private color: CardColor[] = [];

  constructor(character: Character) {
    super({
      name: "赤子之心",
      character,
      description:
        "你传出的非黑色情报被其他角色接收后，你可以摸两张牌，或从手牌中选择一张含有该情报颜色的牌，将其置入你的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_TOC,
      (data) => {
        this.onEffect(gameData, data);
      },
      this
    );
    GameEventCenter.on(GameEvent.PLAYER_RECEIVE_MESSAGE, this.onReceiveMessage, this);
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CHI_ZI_ZHI_XIN_TOC);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.onReceiveMessage, this);
  }

  onReceiveMessage(data: PlayerReceiveMessage) {
    this.color = data.message.color;
  }

  onTrigger(gui: GameManager, params): void {
    const tooltip = gui.tooltip;
    gui.uiLayer.playerActionManager.switchTo(
      new PlayerAction({
        actions: [
          {
            name: "chooseUse",
            handler: () =>
              new Promise((resolve, reject) => {
                tooltip.setText(`你传出的非黑色情报被接收，是否使用【赤子之心】？`);
                tooltip.buttons.setButtons([
                  {
                    text: "是",
                    onclick: () => {
                      resolve(null);
                    },
                  },
                  {
                    text: "否",
                    onclick: () => {
                      reject(null);
                    },
                  },
                ]);
              }),
          },
          {
            name: "chooseAction",
            handler: (data) =>
              new Promise((resolve, reject) => {
                tooltip.setText("请选择一项操作");
                tooltip.buttons.setButtons([
                  {
                    text: "摸两张牌",
                    onclick: () => {
                      resolve({ drawCard: true });
                    },
                  },
                  {
                    text: "置入情报",
                    onclick: () => {
                      resolve({ drawCard: false });
                    },
                  },
                ]);
              }),
          },
          {
            name: "chooseCard",
            handler: (data) =>
              new Promise((resolve, reject) => {
                if (data.drawCard) {
                  resolve(data);
                } else {
                  tooltip.setText("请选择一张手牌置入情报区");
                  gui.gameLayer.startSelectHandCards({ num: 1 });
                  tooltip.buttons.setButtons([
                    {
                      text: "确定",
                      onclick: () => {
                        resolve({ ...data, cardId: gui.selectedHandCards.list[0].id });
                      },
                      enabled: () => {
                        if (gui.selectedHandCards.list.length === 0) return false;
                        for (let c of this.color) {
                          if (Card.hasColor(gui.selectedHandCards.list[0], c)) {
                            return true;
                          }
                        }
                        return false;
                      },
                    },
                  ]);
                }
              }),
          },
        ],
        complete: (data) => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CHI_ZI_ZHI_XIN_TOS, {
            ...data,
            seq: gui.seq,
          });
        },
        cancel: () => {
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: gui.seq,
          });
        },
      })
    );
  }

  onEffect(gameData: GameData, { playerId, card, drawCard }: skill_chi_zi_zhi_xin_toc) {
    GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);

    const player = gameData.playerList[playerId];
    const gameLog = gameData.gameLog;
    gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【赤子之心】`));

    if (!drawCard) {
      const handCard = gameData.playerRemoveHandCard(player, card);
      player.addMessage(handCard);

      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: player,
        message: handCard,
        from: { location: CardActionLocation.PLAYER_HAND_CARD, player },
      });

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}将手牌${gameLog.formatCard(handCard)}置入情报区`));
    }

    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
