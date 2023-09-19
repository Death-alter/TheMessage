import { _decorator, Node, Label, sys, Sprite, color, Component } from "cc";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent, UIEvent } from "../../../Event/type";
import { Tooltip } from "./Tooltip";
import * as GameEventType from "../../../Event/GameEventType";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { Card } from "../../../Components/Card/Card";
import { GamePhase, WaitingType } from "../../../Manager/type";
import { ActiveSkill, PassiveSkill, Skill, TriggerSkill } from "../../../Components/Skill/Skill";
import { SkillButtons } from "./SkillButtons";
import { CardColor, CardDirection, CardType, CardUsableStatus } from "../../../Components/Card/type";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { NoIdentity } from "../../../Components/Identity/IdentityClass/NoIdentity";
import { CharacterInfoWindow } from "../PopupLayer/CharacterInfoWindow";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { PlayerActionStep } from "../../../Utils/PlayerAction/PlayerActionStep";
import { ButtonConfig } from "../../../Components/Utils/DynamicButtons";

const { ccclass, property } = _decorator;

@ccclass("UILayer")
export class UILayer extends Component {
  @property(Node)
  toolTipNode: Node | null = null;
  @property(Node)
  skillButtons: Node | null = null;

  public manager: GameManager;
  public tooltip: Tooltip;

  get selectedHandCards() {
    return this.manager.data && this.manager.data.handCardList.selectedCards;
  }

  get selectedPlayers() {
    return this.manager && this.manager.gameLayer && this.manager.gameLayer.selectedPlayers;
  }

  get seq() {
    return this.manager && this.manager.seq;
  }

  init(manager: GameManager) {
    this.manager = manager;
    this.tooltip = this.toolTipNode.getComponent(Tooltip);

    if (this.manager.isRecord) {
      this.tooltip.showButton = false;
      // this.showCardsWindow.isActive = false;
    }

    this.setSKills();
    this.setSelfIdentityUI();

    this.tooltip.nextPhase.on(Node.EventType.TOUCH_END, () => {
      switch (this.manager.data.gamePhase) {
        case GamePhase.MAIN_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_MAIN_PHASE_TOS, {
            seq: this.manager.seq,
          });
          break;
        case GamePhase.FIGHT_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_FIGHT_PHASE_TOS, {
            seq: this.manager.seq,
          });
          break;
        case GamePhase.RECEIVE_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: this.manager.seq,
          });
          break;
      }
    });
  }

  startRender() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    UIEventCenter.on(UIEvent.UPDATE_SKILL_BUTTONS, this.setSKills, this);
    //使用技能
    GameEventCenter.on(GameEvent.PLAYER_USE_SKILL, this.playerUseSkill, this);

    //技能结算
    GameEventCenter.on(GameEvent.SKILL_ON_EFFECT, this.skillOnEffect, this);

    //技能结算完
    GameEventCenter.on(GameEvent.SKILL_HANDLE_FINISH, this.afterPlayerUseSkill, this);
  }

  stopRender() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    UIEventCenter.off(UIEvent.UPDATE_SKILL_BUTTONS, this.setSKills, this);
    GameEventCenter.off(GameEvent.PLAYER_USE_SKILL, this.playerUseSkill, this);
    GameEventCenter.off(GameEvent.SKILL_ON_EFFECT, this.skillOnEffect, this);
    GameEventCenter.off(GameEvent.SKILL_HANDLE_FINISH, this.afterPlayerUseSkill, this);
  }

  setSelfIdentityUI() {
    const identityNode = this.node.getChildByName("Identity");
    identityNode.getChildByName("Background").getComponent(Sprite).color = color(this.manager.data.identity.color);
    identityNode.getChildByName("Label").getComponent(Label).string = this.manager.data.identity.name;
    if (this.manager.data.identity instanceof MysteriousPerson) {
      const characterInfoWindowComponent = this.manager.popupLayer.getComponentInChildren(CharacterInfoWindow);
      if (sys.isMobile) {
        identityNode.on(Node.EventType.TOUCH_END, (event) => {
          this.manager.popupLayer.characterInfoWindow.active = true;
          this.manager.popupLayer.characterInfoWindow
            .getComponent(CharacterInfoWindow)
            .setText("机密任务：" + (<MysteriousPerson>this.manager.data.identity).secretTaskText);
          characterInfoWindowComponent.setPosition(event);
          this.node.once(Node.EventType.TOUCH_START, () => {
            this.manager.popupLayer.characterInfoWindow.active = false;
          });
        });
      } else {
        identityNode.on(Node.EventType.MOUSE_ENTER, () => {
          this.manager.popupLayer.characterInfoWindow.active = true;
          this.manager.popupLayer.characterInfoWindow
            .getComponent(CharacterInfoWindow)
            .setText("机密任务：" + (<MysteriousPerson>this.manager.data.identity).secretTaskText);
        });
        identityNode.on(
          Node.EventType.MOUSE_MOVE,
          characterInfoWindowComponent.setPosition,
          characterInfoWindowComponent
        );
        identityNode.on(Node.EventType.MOUSE_LEAVE, (event: MouseEvent) => {
          this.manager.popupLayer.characterInfoWindow.active = false;
        });
      }
    } else if (this.manager.data.identity instanceof NoIdentity) {
      identityNode.active = false;
    }
  }

  setSKills() {
    this.skillButtons.getComponent(SkillButtons).init(this.manager, this.manager.data.selfPlayer.character.skills);
  }

  onStartCountDown(data: ProcessEventType.StartCountDown) {
    if (data.playerId === 0) {
      this.tooltip.startCountDown(data.second);
      PlayerAction.clear();

      switch (data.type) {
        case WaitingType.PLAY_CARD:
          switch (this.manager.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              this.tooltip.showNextPhaseButton("传递情报");
              PlayerAction.addStep({
                step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
                data: {
                  tooltipText: "出牌阶段，请选择要使用的卡牌",
                },
              }).start();
              break;
            case GamePhase.FIGHT_PHASE:
              this.tooltip.showNextPhaseButton("跳过");
              PlayerAction.addStep({
                step: PlayerActionStepName.SELECT_HAND_CARD_TO_PLAY,
                data: {
                  tooltipText: "争夺阶段，请选择要使用的卡牌",
                },
              }).start();
              break;
          }
          break;
        case WaitingType.SEND_MESSAGE:
          PlayerAction.addStep({
            step: PlayerActionStepName.SELECT_HAND_CARD_TO_SEND,
            data: {
              tooltipText: "传递阶段，请选择要传递的情报或要使用的卡牌",
            },
          }).start();
          UIEventCenter.emit(UIEvent.ON_SELECT_MESSAGE_TO_SEND, this.manager);
          break;
        case WaitingType.RECEIVE_MESSAGE:
          PlayerAction.addStep({
            step: new PlayerActionStep({
              handler: (data, { next, prev }) => {
                let text = "";
                switch (this.manager.data.messageDirection) {
                  case CardDirection.UP:
                    text = "上";
                    break;
                  case CardDirection.LEFT:
                    text = "左";
                    break;
                  case CardDirection.RIGHT:
                    text = "右";
                    break;
                }

                const f = () => {
                  this.manager.tooltip.setText(`情报传递到你面前，方向向${text}，是否接收情报？`);
                  this.manager.tooltip.buttons.setButtons([
                    {
                      text: "接收情报",
                      onclick: () => {
                        PlayerAction.onComplete((data) => {
                          NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
                            receive: true,
                            seq: this.seq,
                          });
                        });
                        next();
                      },
                    },
                    {
                      text: "不接收",
                      onclick: () => {
                        PlayerAction.onCancel(() => {
                          NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
                            receive: false,
                            seq: this.seq,
                          });
                        });
                        prev();
                      },
                      enabled:
                        !(this.manager.data.lockedPlayer && this.manager.data.lockedPlayer.id === 0) &&
                        this.manager.data.senderId !== 0,
                    },
                  ]);
                };
                f();
                this.manager.gameLayer.startSelectHandCards({
                  num: 1,
                  filter: (card) => this.manager.uiLayer.getCardUsableStatus(card),
                  onSelect: (card: Card) => {
                    const canPlay = card.canPlay(this.manager);
                    if (canPlay) {
                      this.manager.tooltip.setText(`是否使用【${card.name}】`);
                    } else {
                      this.manager.tooltip.setText(`现在不能使用【${card.name}】`);
                    }

                    this.manager.tooltip.buttons.setButtons([
                      {
                        text: "确定",
                        onclick: () => {
                          this.manager.gameLayer.pauseSelectHandCards();
                          card.onPlay(this.manager);
                          next();
                        },
                        enabled: canPlay,
                      },
                      {
                        text: "取消",
                        onclick: () => {
                          this.manager.gameLayer.handCardContainer.resetSelectCard();
                          f();
                        },
                      },
                    ]);
                  },
                  onDeselect: (card: Card) => {
                    f();
                  },
                });
              },
            }),
          }).start();
          break;
        case WaitingType.PLAYER_DYING:
          for (let player of this.manager.data.playerList) {
            if (player.id === data.params.diePlayerId) {
              player.gameObject.showInnerGlow("#FF000080");
            } else {
              player.gameObject.hideInnerGlow();
            }
          }

          PlayerAction.addStep({
            step: new PlayerActionStep({
              handler: ({ initial, current }, { next, prev }) => {
                const player = this.manager.data.playerList[initial.playerId];
                const gameLog = this.manager.data.gameLog;
                const showCardsWindow = this.manager.showCardsWindow;

                this.tooltip.setText(`${gameLog.formatPlayer(player)}濒死，是否使用澄清？`);
                this.manager.gameLayer.startSelectHandCards({
                  num: 1,
                  filter: (card) => {
                    const flag = this.cardCanPlayed(card);
                    if (flag.banned) {
                      return CardUsableStatus.USABLE;
                    } else {
                      if (card.type === CardType.CHENG_QING) {
                        return CardUsableStatus.USABLE;
                      } else {
                        return CardUsableStatus.UNUSABLE;
                      }
                    }
                  },
                });
                this.tooltip.buttons.setButtons([
                  {
                    text: "澄清",
                    onclick: () => {
                      const card = this.manager.selectedHandCards.list[0];
                      PlayerAction.addStep({
                        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
                        data: {
                          title: "请选择一张黑色情报弃置",
                          enabled: () =>
                            showCardsWindow.selectedCards.list.length > 0 &&
                            Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                        },
                      }).onComplete((data) => {
                        NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
                          use: true,
                          cardId: card.id,
                          targetCardId: data[0].cardId,
                          seq: this.seq,
                        });
                      });
                      next({ playerId: player.id });
                    },
                    enabled: () =>
                      this.manager.selectedHandCards.list[0] &&
                      this.manager.selectedHandCards.list[0].type === CardType.CHENG_QING &&
                      this.manager.data.bannedCardTypes.indexOf(CardType.CHENG_QING) === -1,
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      prev();
                    },
                  },
                ]);
              },
            }),
            data: {
              playerId: data.params.diePlayerId,
            },
          })
            .onCancel(() => {
              NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
                use: false,
                seq: this.seq,
              });
            })
            .start();
          break;
        case WaitingType.GIVE_CARD:
          PlayerAction.addStep({ step: PlayerActionStepName.SELECT_DIE_GIVE_CARDS })
            .onComplete((data) => {
              NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
                targetPlayerId: data[0].targetPlayer.id,
                cardId: data[0].cards.map((card) => card.id),
                seq: this.seq,
              });
            })
            .onCancel(() => {
              NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
                targetPlayerId: 0,
                cardId: [],
                seq: this.seq,
              });
            })
            .start();
          break;
        case WaitingType.USE_SKILL:
          if (data.params && data.params.skill) {
            (<TriggerSkill>data.params.skill).onTrigger(this.manager, data.params);
          } else {
            const player = this.manager.data.playerList[data.playerId];
            for (let skill of player.character.skills) {
              if (skill instanceof TriggerSkill || "onTrigger" in skill) {
                (<TriggerSkill>skill).onTrigger(this.manager, data.params);
              }
            }
          }

          break;
      }
    }

    const buttons = this.skillButtons.getComponent(SkillButtons);
    this.manager.data.selfPlayer.character.skills.forEach((skill, index) => {
      if (!skill.gameObject.locked) {
        skill.gameObject.isOn = false;
      }

      if (skill instanceof ActiveSkill) {
        if (
          skill.useablePhase.indexOf(this.manager.data.gamePhase) !== -1 &&
          !this.manager.data.skillBanned &&
          data.type !== WaitingType.PLAYER_DYING
        ) {
          switch (this.manager.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              if (this.manager.data.turnPlayerId === 0) {
                buttons.list[index].useable = true;
              } else {
                buttons.list[index].useable = false;
              }
              break;
            case GamePhase.SEND_PHASE_START:
            case GamePhase.FIGHT_PHASE:
              if (data.playerId === 0) {
                buttons.list[index].useable = true;
              } else {
                buttons.list[index].useable = false;
              }
              break;
          }
        } else {
          buttons.list[index].useable = false;
        }
      } else if (skill instanceof TriggerSkill) {
        if (data.type === WaitingType.USE_SKILL) {
          buttons.list[index].useable = true;
        } else {
          buttons.list[index].useable = false;
        }
      }
    });
  }

  onStopCountDown() {
    this.clearUIState();
    this.tooltip.hideNextPhaseButton();
  }

  playerUseSkill({ player, skill }: GameEventType.PlayerUseSkill) {
    if (!(skill instanceof PassiveSkill)) {
      skill.gameObject?.lock();
      player?.gameObject.setSkillOnUse(skill);
    }
  }

  skillOnEffect(data: GameEventType.SkillOnEffect) {
    const { skill, handler, params } = data;
    if (handler) {
      skill[handler](this.manager, params);
    }
  }

  afterPlayerUseSkill({ player, skill }: GameEventType.AfterPlayerUseSkill) {
    if (!(skill instanceof PassiveSkill)) {
      if (skill.gameObject) {
        skill.gameObject.unlock();
        skill.gameObject.isOn = false;
      }
      player?.gameObject.setSkillOnUse(null);
    }
  }

  cardCanPlayed(card) {
    const banned = this.manager.data.cardBanned && this.manager.data.bannedCardTypes.indexOf(card.type) !== -1;
    return {
      canPlay: card.availablePhases.indexOf(this.manager.data.gamePhase) !== -1 && !banned,
      banned: banned,
    };
  }

  getCardUsableStatus(card: Card) {
    const flag = this.cardCanPlayed(card);
    if (flag.canPlay) {
      return CardUsableStatus.USABLE;
    } else if (flag.banned) {
      return CardUsableStatus.BANNED;
    } else {
      return CardUsableStatus.UNUSABLE;
    }
  }

  clearUIState() {
    this.tooltip.hideNextPhaseButton();
    this.tooltip.setText("");
    this.tooltip.buttons.setButtons([]);
    UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
    UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
  }

  doSendMessage({
    message,
    canCancel = true,
    forceLock = false,
  }: {
    message: Card;
    canCancel?: boolean;
    forceLock?: boolean;
  }) {
    PlayerAction.switchToGroup("SendMessage");
    UIEventCenter.emit(UIEvent.BEFORE_SEND_MESSAGE, { gui: this.manager, canCancel });
    PlayerAction.addStep({
      step: new PlayerActionStep({
        name: "selectMessageTarget",
        handler: ({ initial, current }, { next, prev, passOnPrev }) => {
          const direction = current.direction != null ? current.direction : initial.direction;
          let i;
          switch (direction) {
            case CardDirection.LEFT:
              passOnPrev(() => {
                i = this.manager.data.playerList.length - 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  --i;
                }
                next({
                  targetPlayerId: i,
                  direction,
                });
              });
              break;
            case CardDirection.RIGHT:
              passOnPrev(() => {
                i = 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  ++i;
                }
                next({
                  targetPlayerId: i,
                  direction,
                });
              });
              break;
            case CardDirection.UP:
              this.manager.gameLayer.startSelectPlayers({
                num: 1,
                filter: (player) => {
                  return player.id !== 0;
                },
              });
              this.manager.tooltip.setText("请选择要传递情报的目标");
              const buttons: any = [
                {
                  text: "确定",
                  onclick: () => {
                    const targetPlayerId = this.manager.selectedPlayers.list[0].id;
                    this.manager.gameLayer.stopSelectPlayers();
                    next({
                      targetPlayerId,
                      direction,
                    });
                  },
                  enabled: () => this.manager.selectedPlayers.list.length > 0,
                },
              ];
              if (initial.canCancel || current.index !== 0) {
                buttons.push({
                  text: "取消",
                  onclick: () => {
                    this.manager.gameLayer.stopSelectPlayers();
                    prev();
                  },
                });
              }
              this.manager.tooltip.buttons.setButtons(buttons);
              break;
          }
        },
      }),
      data: {
        direction: message.direction,
        canCancel,
      },
    });
    if (message.lockable || forceLock) {
      PlayerAction.addStep({
        step: new PlayerActionStep({
          name: "selectLockTarget",
          handler: ({ initial, current }, { next, prev }) => {
            this.manager.tooltip.setText("请选择一名角色锁定");
            this.manager.gameLayer.startSelectPlayers({
              num: 1,
              filter: (player) => {
                return player.id !== 0;
              },
            });
            const buttons: ButtonConfig[] = [
              {
                text: "锁定",
                onclick: () => {
                  const lockPlayerId = [this.manager.selectedPlayers.list[0].id];
                  this.manager.gameLayer.stopSelectPlayers();
                  next({
                    lockPlayerId,
                  });
                },
                enabled: () => {
                  return this.manager.selectedPlayers.list.length === 1;
                },
              },
            ];
            if (!forceLock) {
              buttons.push({
                text: "不锁定",
                onclick: () => {
                  this.manager.gameLayer.stopSelectPlayers();
                  next();
                },
              });
            }

            if (initial.canCancel && current.direction === CardDirection.UP) {
              buttons.push({
                text: "取消",
                onclick: () => {
                  prev();
                },
              });
            }
            this.manager.tooltip.buttons.setButtons(buttons);
          },
        }),
        data: { canCancel },
      });
    }
    PlayerAction.onComplete((data) => {
      let d: any = {};
      for (let item of data) {
        d = { ...d, ...item };
      }
      NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, {
        cardId: message.id,
        lockPlayerId: d.lockPlayerId,
        targetPlayerId: d.targetPlayerId,
        cardDir: d.direction != null ? d.direction : message.direction,
        seq: this.seq,
      });

      this.scheduleOnce(() => {
        UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
        UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
      }, 0);
    });
  }
}
