import {
  skill_cang_shen_jiao_tang_a_toc,
  skill_cang_shen_jiao_tang_b_toc,
  skill_cang_shen_jiao_tang_c_toc,
} from "../../../../protobuf/proto";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { CardActionLocation, WaitingType } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { CardColor } from "../../Card/type";
import { Character } from "../../../Components/Chatacter/Character";
import { GameLog } from "../../../Components/GameLog/GameLog";
import { Player } from "../../../Components/Player/Player";
import { TriggerSkill } from "../../../Components/Skill/Skill";

export class CangShenJiaoTang extends TriggerSkill {
  constructor(character: Character) {
    super({
      name: "藏身教堂",
      character,
      description:
        "当你传出的情报被接收后，若接收者是隐藏角色，则你摸一张牌，并可以将该角色翻至面朝下；若是公开角色，则可以将其一张黑色情报加入你的手牌或置入你的情报区。",
    });
  }

  init(gameData: GameData, player: Player) {
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_A_TOC,
      (data) => {
        this.onEffectA(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_B_TOC,
      (data) => {
        this.onEffectB(gameData, data);
      },
      this
    );
    NetworkEventCenter.on(
      NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_C_TOC,
      (data) => {
        this.onEffectC(gameData, data);
      },
      this
    );
  }

  dispose() {
    NetworkEventCenter.off(NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_A_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_B_TOC);
    NetworkEventCenter.off(NetworkEventToC.SKILL_CANG_SHEN_JIAO_TANG_C_TOC);
  }

  onEffectA(
    gameData: GameData,
    { playerId, targetPlayerId, isHiddenRole, waitingSecond, seq }: skill_cang_shen_jiao_tang_a_toc
  ) {
    const player = gameData.playerList[playerId];
    const targetPlayer = gameData.playerList[targetPlayerId];
    const gameLog = gameData.gameLog;

    if (isHiddenRole) {
      GameEventCenter.emit(GameEvent.PLAYER_USE_SKILL, this);
      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【藏身教堂】`));
      if (waitingSecond > 0) {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId: playerId,
          second: waitingSecond,
          type: WaitingType.HANDLE_SKILL,
          seq: seq,
        });
        GameEventCenter.emit(GameEvent.SKILL_ON_EFFECT, {
          skill: this,
          handler: "chooseFlipCharacter",
        });
      } else {
        GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
      }
    } else {
      if (waitingSecond > 0) {
        ProcessEventCenter.emit(ProcessEvent.START_COUNT_DOWN, {
          playerId,
          second: waitingSecond,
          type: WaitingType.USE_SKILL,
          seq: seq,
          params: {
            targetPlayer,
          },
        });
      }
    }
  }

  chooseFlipCharacter(gui: GameManager) {
    const tooltip = gui.tooltip;
    tooltip.setText("是否将该角色翻至面朝下？");
    tooltip.buttons.setButtons([
      {
        text: "是",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CANG_SHEN_JIAO_TANG_B_TOS, {
            enable: true,
            seq: gui.seq,
          });
        },
      },
      {
        text: "否",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CANG_SHEN_JIAO_TANG_B_TOS, {
            enable: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onTrigger(gui: GameManager, params) {
    const { targetPlayer } = params;
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;
    const data: any = {
      seq: gui.seq,
    };

    gui.uiLayer.playerActionManager.switchTo(
      new PlayerAction({
        actions: [
          {
            name: "chooseUse",
            handler: () =>
              new Promise((resolve, reject) => {
                tooltip.setText("是否获得一张黑色情报？");
                tooltip.buttons.setButtons([
                  {
                    text: "是",
                    onclick: () => {
                      data.enable = true;
                      resolve(null);
                    },
                  },
                  {
                    text: "否",
                    onclick: () => {
                      data.enable = false;
                      reject(null);
                    },
                  },
                ]);
              }),
          },
          {
            name: "chooseMessage",
            handler: () =>
              new Promise((resolve, reject) => {
                showCardsWindow.show({
                  title: "请选择一张黑色情报",
                  limit: 1,
                  cardList: targetPlayer.getMessagesCopy(),
                  buttons: [
                    {
                      text: "确定",
                      onclick: () => {
                        data.cardId = showCardsWindow.selectedCards.list[0].id;
                        showCardsWindow.hide();
                        resolve(null);
                      },
                      enabled: () =>
                        showCardsWindow.selectedCards.list.length &&
                        Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                    },
                    {
                      text: "取消",
                      onclick: () => {
                        reject(null);
                      },
                    },
                  ],
                });
              }),
          },
          {
            name: "chooseAction",
            handler: () =>
              new Promise((resolve, reject) => {
                if (targetPlayer.id === 0) {
                  data.asMessageCard = false;
                  resolve(null);
                } else {
                  tooltip.setText("请选择一项");
                  tooltip.buttons.setButtons([
                    {
                      text: "加入手牌",
                      onclick: () => {
                        data.asMessageCard = false;
                        resolve(null);
                      },
                    },
                    {
                      text: "置入情报区",
                      onclick: () => {
                        data.asMessageCard = true;
                        resolve(null);
                      },
                    },
                  ]);
                }
              }),
          },
        ],
        complete: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CANG_SHEN_JIAO_TANG_C_TOS, data);
        },
        cancel: () => {
          NetworkEventCenter.emit(NetworkEventToS.SKILL_CANG_SHEN_JIAO_TANG_C_TOS, data);
        },
      })
    );
  }

  onEffectB(gameData: GameData, { playerId, targetPlayerId, enable }: skill_cang_shen_jiao_tang_b_toc) {
    if (enable) {
      const gameLog = gameData.gameLog;
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}将${gameLog.formatPlayer(targetPlayer)}翻至面朝下`));
    }
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }

  onEffectC(
    gameData: GameData,
    { enable, playerId, targetPlayerId, cardId, asMessageCard }: skill_cang_shen_jiao_tang_c_toc
  ) {
    if (enable) {
      const player = gameData.playerList[playerId];
      const targetPlayer = gameData.playerList[targetPlayerId];
      const gameLog = gameData.gameLog;
      const message = targetPlayer.removeMessage(cardId);

      gameLog.addData(new GameLog(`${gameLog.formatPlayer(player)}使用技能【藏身教堂】`));
      if (asMessageCard) {
        player.addMessage(message);
        GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
          player,
          message,
          from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
        });
        gameLog.addData(
          new GameLog(
            `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
              message
            )}置入情报区`
          )
        );
      } else {
        gameData.playerAddHandCard(player, message);
        GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
          player,
          card: message,
          from: { location: CardActionLocation.PLAYER_MESSAGE_ZONE, player: targetPlayer },
        });
        gameLog.addData(
          new GameLog(
            `${gameLog.formatPlayer(player)}把${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(
              message
            )}加入手牌`
          )
        );
      }
    }
    GameEventCenter.emit(GameEvent.SKILL_HANDLE_FINISH, this);
  }
}
