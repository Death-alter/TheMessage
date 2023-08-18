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
import { CardDirection, CardType, CardUsableStatus } from "../../../Components/Card/type";
import { MysteriousPerson } from "../../../Components/Identity/IdentityClass/MysteriousPerson";
import { NoIdentity } from "../../../Components/Identity/IdentityClass/NoIdentity";
import { CharacterInfoWindow } from "../PopupLayer/CharacterInfoWindow";
import { PlayerActionManager } from "../../../Utils/PlayerAction/PlayerActionManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerActionName } from "../../../Utils/PlayerAction/type";

const { ccclass, property } = _decorator;

@ccclass("UILayer")
export class UILayer extends Component {
  @property(Node)
  toolTipNode: Node | null = null;
  @property(Node)
  skillButtons: Node | null = null;

  public manager: GameManager;
  public tooltip: Tooltip;
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
    ProcessEventCenter.on(ProcessEvent.GET_AUTO_PLAY_STATUS, this.onAutoPlayStatusChange, this);
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
    ProcessEventCenter.off(ProcessEvent.GET_AUTO_PLAY_STATUS, this.onAutoPlayStatusChange, this);
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
      switch (data.type) {
        case WaitingType.PLAY_CARD:
          switch (this.manager.data.gamePhase) {
            case GamePhase.MAIN_PHASE:
              this.playerAction = PlayerActionManager.getAction(PlayerActionName.MAIN_PHASE_ACTION);
              this.playerAction.start();
              break;
            case GamePhase.FIGHT_PHASE:
              this.playerAction = PlayerActionManager.getAction(PlayerActionName.FIGHT_PHASE_ACTION);
              this.playerAction.start();
              break;
          }
          break;
        case WaitingType.SEND_MESSAGE:
          this.playerAction = PlayerActionManager.getAction(PlayerActionName.SEND_MESSAGE_ACTION);
          this.playerAction.start();
          break;
        case WaitingType.RECEIVE_MESSAGE:
          this.playerAction = PlayerActionManager.getAction(PlayerActionName.RECEIVE_MESSAGE_ACTION);
          this.playerAction.start();

          break;
        case WaitingType.PLAYER_DYING:
          this.playerAction = PlayerActionManager.getAction(PlayerActionName.PLAYER_DYING_ACTION);
          this.playerAction.start();
          break;
        case WaitingType.GIVE_CARD:
          this.playerAction = PlayerActionManager.getAction(PlayerActionName.PLAYER_DIE_GIVE_CARD_ACTION);
          this.playerAction.start();
          break;
        case WaitingType.USE_SKILL:
          const player = this.manager.data.playerList[data.playerId];
          for (let skill of player.character.skills) {
            if (skill instanceof TriggerSkill || "onTrigger" in skill) {
              (<TriggerSkill>skill).onTrigger(this.manager, data.params);
            }
          }
          break;
      }
    }

    const buttons = this.skillButtons.getComponent(SkillButtons);
    this.manager.data.selfPlayer.character.skills.forEach((skill, index) => {
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
    // this.playerActionManager.clearAction();
    this.playerAction = null;
    this.clearUIState();
    this.tooltip.hideNextPhaseButton();
  }

  onAutoPlayStatusChange({ enable }) {
    if (!enable) {
      this.playerAction.start();
    }
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

  getCardUsableStatus(card: Card) {
    const flag = this.cardCanPlayed(card);
    if (flag.canPlay) {
      return CardUsableStatus.USABLE;
    } else if (flag.banned) {
      return CardUsableStatus.BANNED;
    } else {
      return CardUsableStatus.UNUSEABLE;
    }
  }

  clearUIState() {
    this.tooltip.hideNextPhaseButton();
    this.tooltip.setText("");
    this.tooltip.buttons.setButtons([]);
    UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
    UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
  }

  doSendMessage() {
    this.playerActionManager.switchTo(this.createDoSendMessageAction());
  }

  createDoSendMessageAction() {
    const c = this.selectedHandCards.list[0];
    const actions = [
      {
        name: "selectTarget",
        handler: (direction?: CardDirection) =>
          new Promise((resolve, reject) => {
            const card = this.selectedHandCards.list[0] || c;
            const data: any = {
              cardId: card.id,
              lockPlayerId: [],
              cardDir: direction == null ? card.direction : direction,
              seq: this.seq,
              lockable: card.lockable,
            };
            let i;
            switch (data.cardDir) {
              case CardDirection.LEFT:
                i = this.manager.data.playerList.length - 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  --i;
                }
                data.targetPlayerId = i;
                resolve(data);
                break;
              case CardDirection.RIGHT:
                i = 1;
                while (!this.manager.data.playerList[i].isAlive) {
                  ++i;
                }
                data.targetPlayerId = i;
                resolve(data);
                break;
              case CardDirection.UP:
                this.tooltip.setText("请选择要传递情报的目标");
                this.tooltip.buttons.setButtons([
                  {
                    text: "确定",
                    onclick: () => {
                      UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
                      resolve(data);
                    },
                    enabled: () => this.selectedPlayers.list.length > 0,
                  },
                ]);
                UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                  num: 1,
                  filter: (player) => {
                    return player.id !== 0;
                  },
                  onSelect: (player) => {
                    data.targetPlayerId = player.id;
                  },
                });
                break;
            }
          }),
      },
      {
        name: "confirmLock",
        handler: (data) =>
          new Promise((resolve, reject) => {
            if (data.lockable) {
              this.tooltip.setText("请选择一名角色锁定");
              UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
                num: 1,
                filter: (player) => {
                  return player.id !== 0;
                },
              });
              this.tooltip.buttons.setButtons([
                {
                  text: "锁定",
                  onclick: () => {
                    data.lockPlayerId = [this.selectedPlayers.list[0].id];
                    resolve(data);
                  },
                  enabled: () => {
                    return this.selectedPlayers.list.length === 1;
                  },
                },
                {
                  text: "不锁定",
                  onclick: () => {
                    resolve(data);
                  },
                },
              ]);
            } else {
              resolve(data);
            }
          }),
      },
    ];
    return new PlayerAction({
      actions,
      complete: (data) => {
        NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, {
          cardId: data.cardId,
          lockPlayerId: data.lockPlayerId,
          targetPlayerId: data.targetPlayerId,
          cardDir: data.cardDir,
          seq: data.seq,
        });

        this.scheduleOnce(() => {
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_HAND_CARD);
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
        }, 0);
      },
    });
  }
}
