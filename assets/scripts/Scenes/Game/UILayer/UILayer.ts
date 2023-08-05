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
import { CardDirection, CardType } from "../../../Components/Card/type";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { NoIdentity } from "../../../Components/Identity/IdentityClass/NoIdentity";
import { CharacterInfoWindow } from "./CharacterInfoWindow";
import { PlayerAction } from "../../../Utils/PlayerAction";
import { GameManager } from "../../../Manager/GameManager";

const { ccclass, property } = _decorator;

@ccclass("UILayer")
export class UILayer extends Component {
  @property(Node)
  toolTipNode: Node | null = null;
  @property(Node)
  skillButtons: Node | null = null;

  public manager: GameManager;
  public tooltip: Tooltip;
  private oldPlayerAction: PlayerAction;
  public playerAction: PlayerAction;

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

    this.skillButtons.getComponent(SkillButtons).init(this.manager, this.manager.data.selfPlayer.character.skills);
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
      this.tooltip.hideNextPhaseButton();
    });
  }

  startRender() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);

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

  onStartCountDown(data: ProcessEventType.StartCountDown) {
    if (data.playerId === 0) {
      this.tooltip.startCoundDown(data.second);
      switch (data.type) {
        case WaitingType.PLAY_CARD:
          switch (this.manager.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              this.tooltip.setNextPhaseButtonText("传递阶段");
              this.tooltip.showNextPhaseButton();
              this.promptUseHandCard("出牌阶段，请选择要使用的卡牌");
              break;
            case GamePhase.FIGHT_PHASE:
              this.tooltip.setNextPhaseButtonText("跳过");
              this.tooltip.showNextPhaseButton();
              this.promptUseHandCard("争夺阶段，请选择要使用的卡牌");
              break;
          }
          break;
        case WaitingType.SEND_MESSAGE:
          this.promptSendMessage("传递阶段，请选择要传递的情报或要使用的卡牌");
          break;
        case WaitingType.RECEIVE_MESSAGE:
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

          this.promptReceiveMessage(`情报传递到你面前，方向向${text}，是否接收情报？`);
          break;
        case WaitingType.PLAYER_DYING:
          this.promptUseChengQing("玩家濒死，是否使用澄清？", data.params.diePlayerId);
          break;
        case WaitingType.GIVE_CARD:
          this.promptDieGiveCard("你已死亡，请选择最多三张手牌交给其他角色");
          break;
        case WaitingType.USE_SKILL:
          const player = this.manager.data.playerList[data.playerId];
          for (let skill of player.character.skills) {
            if (skill instanceof TriggerSkill) {
              skill.onTrigger(this.manager, data.params);
            }
          }
          break;
      }
    }

    const buttons = this.skillButtons.getComponent(SkillButtons);
    this.manager.data.selfPlayer.character.skills.forEach((skill, index) => {
      if (skill instanceof ActiveSkill) {
        if (skill.useablePhase.indexOf(this.manager.data.gamePhase) !== -1 && !this.manager.data.skillBanned) {
          switch (this.manager.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
            case GamePhase.SEND_PHASE_START:
              if (this.manager.data.turnPlayerId === 0) {
                buttons.list[index].useable = true;
              } else {
                buttons.list[index].useable = false;
              }
              break;
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
    this.tooltip.hide();
    this.tooltip.hideNextPhaseButton();
  }

  playerUseSkill(skill: Skill) {
    if (!(skill instanceof PassiveSkill) && skill.gameObject) {
      skill.gameObject.lock();
    }
  }

  skillOnEffect(data: GameEventType.SkillOnEffect) {
    const { skill, handler, params } = data;
    if (handler) {
      skill[handler](this.manager, params);
    }
  }

  afterPlayerUseSkill(skill: Skill) {
    if (!(skill instanceof PassiveSkill) && skill.gameObject) {
      skill.gameObject.unlock();
      skill.gameObject.isOn = false;
    }
  }

  cardCanPlayed(card) {
    const banned = this.manager.data.cardBanned && this.manager.data.bannedCardTypes.indexOf(card.type) !== -1;
    return {
      canPlay: card.availablePhases.indexOf(this.manager.data.gamePhase) !== -1 && !banned,
      banned: banned,
    };
  }

  savePlayerAction() {
    this.oldPlayerAction = this.playerAction;
    this.playerAction = null;
  }

  restorePlayerAction() {
    this.playerAction = this.oldPlayerAction;
    this.oldPlayerAction = null;
    this.playerAction.handleAction();
  }

  promptUseHandCard(tooltipText) {
    this.playerAction = new PlayerAction({
      actions: [
        {
          name: "setText",
          handler: () =>
            new Promise(() => {
              this.tooltip.setText(tooltipText);
              this.tooltip.buttons.setButtons([]);
            }),
        },
        {
          name: "playCard",
          handler: (card: Card) =>
            new Promise(() => {
              const flag = this.cardCanPlayed(card);
              if (flag.canPlay) {
                card.onSelectedToPlay(this.manager);
              } else {
                if (flag.banned) {
                  this.tooltip.setText("这张卡被禁用了");
                } else {
                  this.tooltip.setText("现在不能使用这张卡");
                }
              }
            }),
        },
      ],
    });

    this.playerAction.start();
    UIEventCenter.emit(UIEvent.START_SELECT_HAND_CARD, {
      num: 1,
      onSelect: (card: Card) => {
        this.playerAction.next(card);
      },
      onDeselect: (card: Card) => {
        card.onDeselected(this.manager);
        this.playerAction.prev();
      },
    });
  }

  promptUseChengQing(tooltipText, playerId) {
    this.playerAction = new PlayerAction({
      actions: [
        {
          name: "setTooltip",
          handler: () =>
            new Promise((resolve, reject) => {
              this.tooltip.setText(tooltipText);
              UIEventCenter.emit(UIEvent.START_SELECT_HAND_CARD, { num: 1 });
              this.tooltip.buttons.setButtons([
                {
                  text: "澄清",
                  onclick: () => {
                    resolve(null);
                  },
                  enabled: () =>
                    this.selectedHandCards.list[0] &&
                    this.selectedHandCards.list[0].type === CardType.CHENG_QING &&
                    this.manager.data.bannedCardTypes.indexOf(CardType.CHENG_QING) === -1,
                },
                {
                  text: "取消",
                  onclick: () => {
                    reject(null);
                  },
                },
              ]);
            }),
        },
        {
          name: "showCards",
          handler: () =>
            new Promise((resolve, reject) => {
              const player = this.manager.data.playerList[playerId];
              UIEventCenter.emit(UIEvent.START_SHOW_CARDS, {
                title: "选择一张情报弃置",
                cardList: player.getMessagesCopy(),
                limit: 1,
                buttons: [
                  {
                    text: "确定",
                    onclick: (window) => {
                      resolve(window.selectedCards.list[0].id);
                      window.hide();
                    },
                  },
                  {
                    text: "取消",
                    onclick: (window) => {
                      reject(null);
                      window.hide();
                    },
                  },
                ],
              });
            }),
        },
      ],
      complete: (targetCardId) => {
        NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
          use: true,
          cardId: this.selectedHandCards.list[0].id,
          targetCardId,
          seq: this.seq,
        });
      },
      cancel: () => {
        UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
        NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
          use: false,
          seq: this.seq,
        });
      },
    });
    this.playerAction.start();
  }

  promptDieGiveCard(tooltipText) {
    this.playerAction = new PlayerAction({
      actions: [
        {
          name: "setTooltip",
          handler: () =>
            new Promise((resolve, reject) => {
              this.tooltip.setText(tooltipText);
              UIEventCenter.emit(UIEvent.START_SELECT_HAND_CARD, { num: 3 });
              UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                num: 1,
                filter: (player) => player.id !== 0,
              });
              this.tooltip.buttons.setButtons([
                {
                  text: "确定",
                  onclick: () => {
                    resolve(null);
                  },
                  enabled: () => this.selectedHandCards.list.length > 0 && this.selectedPlayers.list.length > 0,
                },
                {
                  text: "取消",
                  onclick: () => {
                    reject(null);
                  },
                },
              ]);
            }),
        },
      ],
      complete: () => {
        NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
          targetPlayerId: this.selectedPlayers.list[0].id,
          cardId: this.selectedHandCards.list.map((card) => card.id),
          seq: this.seq,
        });
      },
      cancel: () => {
        NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
          targetPlayerId: 0,
          cardId: [],
          seq: this.seq,
        });
      },
    });
    this.playerAction.start();
  }

  promptSendMessage(tooltipText) {
    this.tooltip.setText(tooltipText);
    this.tooltip.buttons.setButtons([]);
    UIEventCenter.emit(UIEvent.START_SELECT_HAND_CARD, {
      num: 1,
      onSelect: (card: Card) => {
        this.tooltip.setText("请选择一项操作");
        if (this.cardCanPlayed(card).canPlay) {
          this.tooltip.buttons.setButtons([
            {
              text: card.name,
              onclick: () => {
                card.onSelectedToPlay(this.manager);
              },
            },
            {
              text: "传递情报",
              onclick: () => {
                this.doSendMessage();
              },
            },
          ]);
        } else {
          this.tooltip.buttons.setButtons([
            {
              text: "传递情报",
              onclick: () => {
                this.doSendMessage();
              },
            },
          ]);
        }
      },
      onDeselect: (card: Card) => {
        this.tooltip.setText(tooltipText);
        this.tooltip.buttons.setButtons([]);
        UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
        if (card.availablePhases.indexOf(this.manager.data.gamePhase) !== -1) {
          card.onDeselected(this.manager);
        }
      },
    });
  }

  promptReceiveMessage(tooltipText) {
    const setTooltip = () => {
      this.tooltip.setText(tooltipText);
      this.tooltip.buttons.setButtons([
        {
          text: "接收情报",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
              receive: true,
              seq: this.seq,
            });
          },
        },
        {
          text: "不接收",
          onclick: () => {
            NetworkEventCenter.emit(NetworkEventToS.CHOOSE_WHETHER_RECEIVE_TOS, {
              receive: false,
              seq: this.seq,
            });
          },
          enabled: !(this.manager.data.lockedPlayer && this.manager.data.lockedPlayer.id === 0) && this.manager.data.senderId !== 0,
        },
      ]);
    };

    setTooltip();
    UIEventCenter.emit(UIEvent.START_SELECT_HAND_CARD, {
      num: 1,
      onSelect: (card: Card) => {
        const flag = this.cardCanPlayed(card);
        if (flag.canPlay) {
          card.onSelectedToPlay(this.manager);
        } else {
          if (flag.banned) {
            this.tooltip.setText("这张卡被禁用了");
          } else {
            this.tooltip.setText("现在不能使用这张卡");
          }
        }
      },
      onDeselect: (card: Card) => {
        setTooltip();
        if (this.cardCanPlayed(card).canPlay) {
          card.onDeselected(this.manager);
        }
      },
    });
  }

  doSendMessage(direction?: CardDirection) {
    const card = this.selectedHandCards.list[0];
    const data: any = {
      cardId: card.id,
      lockPlayerId: [],
      cardDir: direction == null ? card.direction : direction,
      seq: this.seq,
    };
    UIEventCenter.emit(UIEvent.SELECT_HAND_CARD_COMPLETE);

    const actions = [
      {
        name: "selectTarget",
        handler: () =>
          new Promise((resolve, reject) => {
            let i;
            switch (data.cardDir) {
              case CardDirection.LEFT:
                i = this.manager.data.playerList.length - 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  --i;
                }
                data.targetPlayerId = i;
                resolve(null);
                break;
              case CardDirection.RIGHT:
                i = 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  ++i;
                }
                data.targetPlayerId = i;
                resolve(null);
                break;
              case CardDirection.UP:
                this.tooltip.setText("请选择要传递情报的目标");
                this.tooltip.buttons.setButtons([]);
                UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                  num: 1,
                  filter: (player) => {
                    return player.id !== 0;
                  },
                  onSelect: (player) => {
                    data.targetPlayerId = player.id;
                    resolve(null);
                  },
                });
                break;
            }
          }),
      },
    ];
    if (card.lockable) {
      actions.push({
        name: "confirmLock",
        handler: () =>
          new Promise((resolve, reject) => {
            switch (data.cardDir) {
              case CardDirection.LEFT:
              case CardDirection.RIGHT:
                this.tooltip.setText("请选择一名角色锁定");
                UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                  num: 1,
                  filter: (player) => {
                    return player.id !== 0;
                  },
                });
                break;
              case CardDirection.UP:
                this.tooltip.setText("是否锁定该角色");
                break;
            }
            this.tooltip.buttons.setButtons([
              {
                text: "锁定",
                onclick: () => {
                  switch (data.cardDir) {
                    case CardDirection.LEFT:
                    case CardDirection.RIGHT:
                      data.lockPlayerId = [this.selectedPlayers.list[0].id];
                      break;
                    case CardDirection.UP:
                      data.lockPlayerId = [data.targetPlayerId];
                      break;
                  }
                  resolve(null);
                },
                enabled: () => {
                  return this.selectedPlayers.list.length === 1;
                },
              },
              {
                text: "不锁定",
                onclick: () => {
                  resolve(null);
                },
              },
            ]);
          }),
      });
    }

    this.playerAction = new PlayerAction({
      actions,
      complete: () => {
        NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, data);

        this.scheduleOnce(() => {
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
        }, 0);
      },
    });

    this.playerAction.start();
  }
}
