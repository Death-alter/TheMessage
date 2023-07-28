import { _decorator, Node, Prefab, instantiate, Layout, Label, sys, Sprite, color } from "cc";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { HandCardContianer } from "../../../Game/Container/HandCardContianer";
import { CardAction } from "../../../GameManager/CardAction";
import { Tooltip } from "../../../GameManager/Tooltip";
import * as GameEventType from "../../../Event/GameEventType";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { PlayerObject } from "../../../Game/Player/PlayerObject";
import { GameObject } from "../../../GameObject";
import { GameData } from "./GameData";
import { Card } from "../../../Game/Card/Card";
import { CardActionLocation, GamePhase, WaitingType } from "../../../GameManager/type";
import { ShowCardsWindow } from "../ShowCardsWindow/ShowCardsWindow";
import { Player } from "../../../Game/Player/Player";
import { SelectedList } from "../../../Utils/SelectedList";
import { CardDirection, CardType } from "../../../Game/Card/type";
import { OuterGlow } from "../../../Utils/OuterGlow";
import { ActiveSkill, PassiveSkill, Skill, TriggerSkill } from "../../../Game/Skill/Skill";
import { SkillButtons } from "./SkillButtons";
import { CharacterInfoWindow } from "./CharacterInfoWindow";
import { CharacterObject } from "../../../Game/Character/CharacterObject";
import { MysteriousPerson } from "../../../Game/Identity/IdentityClass/MysteriousPerson";
import { NoIdentity } from "../../../Game/Identity/IdentityClass/NoIdentity";
import { PlayerAction } from "../../PlayerAction";
import { AudioMgr } from "../../Resident/AudioMgr";
import { Sex } from "../../../Game/Character/type";

const { ccclass, property } = _decorator;

@ccclass("GameUI")
export class GameUI extends GameObject<GameData> {
  @property(Prefab)
  playerPrefab: Prefab | null = null;
  @property(Node)
  leftPlayerNodeList: Node | null = null;
  @property(Node)
  topPlayerNodeList: Node | null = null;
  @property(Node)
  rightPlayerNodeList: Node | null = null;
  @property(Node)
  deckText: Node | null = null;
  @property(Node)
  deckNode: Node | null = null;
  @property(Node)
  discardPileNode: Node | null = null;
  @property(Node)
  handCardUI: Node | null = null;
  @property(Node)
  cardActionNode: Node | null = null;
  @property(Node)
  toolTipNode: Node | null = null;
  @property(Node)
  cardInfoWindow: Node | null = null;
  @property(Node)
  characterInfoWindow: Node | null = null;
  @property(Node)
  showCardWindowNode: Node | null = null;
  @property(Node)
  skillButtons: Node | null = null;

  public cardAction: CardAction;
  public tooltip: Tooltip;
  public playerObjectList: PlayerObject[] = [];
  public seq: number;
  public showCardsWindow: ShowCardsWindow;
  public selectedPlayers: SelectedList<Player> = new SelectedList<Player>();
  public handCardContainer: HandCardContianer;
  private oldPlayerAction: PlayerAction;
  public playerAction: PlayerAction;
  public audioManager: AudioMgr;

  get selectedHandCards() {
    return this.data.handCardList.selectedCards;
  }

  onLoad() {
    this.showCardsWindow = this.showCardWindowNode.getComponent(ShowCardsWindow);
    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.tooltip = this.toolTipNode.getComponent(Tooltip);
    this.audioManager = new AudioMgr();
    this.tooltip.nextPhase.on(Node.EventType.TOUCH_END, () => {
      switch (this.data.gamePhase) {
        case GamePhase.MAIN_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_MAIN_PHASE_TOS, {
            seq: this.seq,
          });
          break;
        case GamePhase.FIGHT_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_FIGHT_PHASE_TOS, {
            seq: this.seq,
          });
          break;
        case GamePhase.RECEIVE_PHASE:
          NetworkEventCenter.emit(NetworkEventToS.END_RECEIVE_PHASE_TOS, {
            seq: this.seq,
          });
          break;
      }
      this.tooltip.hideNextPhaseButton();
    });
  }

  startRender() {
    this.cardAction.node.active = true;
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);

    //收到初始化
    // GameEventCenter.on(GameEvent.GAME_INIT, this.init, this);

    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange);

    GameEventCenter.on(GameEvent.GAME_TURN_CHANGE, this.onGameTurnChange, this);

    //卡组数量变化
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);

    //洗牌
    // GameEventCenter.on(GameEvent.DECK_SHUFFLED, () => {});

    //抽牌
    GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);

    //弃牌
    GameEventCenter.on(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);

    //卡牌加入手牌
    GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);

    //打出卡牌
    GameEventCenter.on(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard, this);

    //卡牌结算
    GameEventCenter.on(GameEvent.CARD_ON_EFFECT, this.cardOnEffect, this);

    //卡牌结算完
    GameEventCenter.on(GameEvent.AFTER_PLAYER_PLAY_CARD, this.afterPlayerPlayCard, this);

    //使用技能
    GameEventCenter.on(GameEvent.PLAYER_USE_SKILL, this.playerUseSkill, this);

    //技能结算
    GameEventCenter.on(GameEvent.SKILL_ON_EFFECT, this.skillOnEffect, this);

    //技能结算完
    GameEventCenter.on(GameEvent.SKILL_HANDLE_FINISH, this.afterPlayerUseSkill, this);

    //玩家开始传递情报
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);

    GameEventCenter.on(GameEvent.MESSAGE_REMOVED, this.removeMessage, this);

    //情报传递
    GameEventCenter.on(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage, this);

    //情报传递
    GameEventCenter.on(GameEvent.MESSAGE_REPLACED, this.replaceMessage, this);

    //情报置入情报区
    GameEventCenter.on(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone, this);

    //有人选择接收情报
    GameEventCenter.on(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);

    //接收情报
    GameEventCenter.on(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage, this);

    //移除情报
    GameEventCenter.on(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);

    //玩家死前
    // GameEventCenter.on(GameEvent.PLAYER_BEFORE_DEATH, (data: GameEventType.PlayerBeforeDeath) => {});

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);

    GameEventCenter.on(GameEvent.CARD_MOVED, this.moveCard, this);
  }

  stopRender() {
    this.cardAction.node.active = false;
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    // GameEventCenter.off(GameEvent.GAME_INIT, this.init, this);
    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange);
    GameEventCenter.off(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards, this);
    GameEventCenter.off(GameEvent.CARD_ON_EFFECT, this.cardOnEffect, this);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards, this);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard, this);
    GameEventCenter.off(GameEvent.PLAYER_USE_SKILL, this.playerUseSkill, this);
    GameEventCenter.off(GameEvent.SKILL_ON_EFFECT, this.skillOnEffect, this);
    GameEventCenter.off(GameEvent.SKILL_HANDLE_FINISH, this.afterPlayerUseSkill, this);
    GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard, this);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_REPLACED, this.replaceMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_REMOVED, this.removeMessage, this);
    GameEventCenter.off(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone, this);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_REMOVE_MESSAGE, this.playerRemoveMessage, this);
    GameEventCenter.off(GameEvent.PLAYER_DIE, this.playerDie, this);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
    GameEventCenter.on(GameEvent.CARD_MOVED, this.moveCard, this);
  }

  init(isRecord: boolean) {
    if (sys.isMobile) {
      //展示卡牌窗口
      this.node.on(
        Node.EventType.TOUCH_START,
        () => {
          this.cardInfoWindow.active = false;
        },
        this
      );
    }

    if (isRecord) {
      this.tooltip.showButton = false;
      this.showCardsWindow.isActive = false;
    }

    //创建自己的UI
    const selfNode = this.node.getChildByPath("Self/Player");
    this.data.playerList[0].gameObject = selfNode.getComponent(PlayerObject);
    this.playerObjectList.push(this.data.playerList[0].gameObject);
    this.skillButtons.getComponent(SkillButtons).init(this, this.data.selfPlayer.character.skills);

    this.setSelfIdentityUI();

    //初始化手牌UI
    this.handCardContainer = this.handCardUI.getComponent(HandCardContianer);
    this.data.handCardList.gameObject = this.handCardContainer;
    this.handCardContainer.init();
    this.cardAction.handCardList = this.data.handCardList;
    for (let card of this.data.selfPlayer.handCards) {
      this.data.handCardList.addData(card);
    }

    //创建其他人UI
    const othersCount = this.data.playerList.length - 1;
    const sideLength = Math.floor(othersCount / 3);
    this.rightPlayerNodeList.removeAllChildren();
    this.leftPlayerNodeList.removeAllChildren();
    this.topPlayerNodeList.removeAllChildren();

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      this.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(this.data.playerList[i + 1].gameObject);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      this.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(this.data.playerList[i + 1].gameObject);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      this.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(this.data.playerList[i + 1].gameObject);
    }

    this.rightPlayerNodeList.getComponent(Layout).updateLayout();
    this.topPlayerNodeList.getComponent(Layout).updateLayout();
    this.leftPlayerNodeList.getComponent(Layout).updateLayout();

    //绑定点击事件
    for (let i = 0; i < this.data.playerList.length; i++) {
      const player = this.data.playerList[i];
      player.gameObject.node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          this.selectPlayer(player);
        },
        this
      );

      const charcaterNode = player.gameObject.node.getChildByPath("Border/CharacterPanting");

      const characterInfoWindowComponent = this.characterInfoWindow.getComponent(CharacterInfoWindow);
      if (sys.isMobile) {
        charcaterNode.on("longtap", (event) => {
          this.characterInfoWindow.active = true;
          const character = (<Node>(<unknown>event.target)).getComponent(CharacterObject).data;
          characterInfoWindowComponent.getComponent(CharacterInfoWindow).setCharacterInfo(character);
          characterInfoWindowComponent.setPosition(event);

          this.node.once(Node.EventType.TOUCH_START, () => {
            this.characterInfoWindow.active = false;
          });
        });
      } else {
        charcaterNode.on(Node.EventType.MOUSE_ENTER, (event: MouseEvent) => {
          this.characterInfoWindow.active = true;
          const character = (<Node>(<unknown>event.target)).getComponent(CharacterObject).data;
          characterInfoWindowComponent.getComponent(CharacterInfoWindow).setCharacterInfo(character);
        });
        charcaterNode.on(
          Node.EventType.MOUSE_MOVE,
          characterInfoWindowComponent.setPosition,
          characterInfoWindowComponent
        );
        charcaterNode.on(Node.EventType.MOUSE_LEAVE, (event: MouseEvent) => {
          this.characterInfoWindow.active = false;
        });
      }

      const messageZone = this.playerObjectList[i].node.getChildByPath("Border/Message");
      messageZone.on(Node.EventType.TOUCH_END, () => {
        this.showCardsWindow.show({
          title: `【${player.seatNumber + 1}号】${player.character.name}的情报区`,
          limit: 0,
          cardList: player.getMessagesCopy(),
          buttons: [
            {
              text: "关闭",
              onclick: () => {
                this.showCardsWindow.hide();
              },
            },
          ],
        });
      });
    }

    //如果有传递中的情报
    if (this.data.messageInTransmit) {
      this.cardAction.setCard(this.data.messageInTransmit, {
        location: CardActionLocation.PLAYER,
        player: this.data.playerList[this.data.messagePlayerId],
      });
      this.cardAction.transmissionMessageObject = this.data.messageInTransmit.gameObject;
    }
  }

  setSelfIdentityUI() {
    const identityNode = this.node.getChildByPath("Self/Identity");
    identityNode.getChildByName("Background").getComponent(Sprite).color = color(this.data.identity.color);
    identityNode.getChildByName("Label").getComponent(Label).string = this.data.identity.name;
    if (this.data.identity instanceof MysteriousPerson) {
      const characterInfoWindowComponent = this.characterInfoWindow.getComponent(CharacterInfoWindow);
      if (sys.isMobile) {
        identityNode.on(Node.EventType.TOUCH_END, (event) => {
          this.characterInfoWindow.active = true;
          this.characterInfoWindow
            .getComponent(CharacterInfoWindow)
            .setText("机密任务：" + (<MysteriousPerson>this.data.identity).secretTaskText);
          characterInfoWindowComponent.setPosition(event);
          this.node.once(Node.EventType.TOUCH_START, () => {
            this.characterInfoWindow.active = false;
          });
        });
      } else {
        identityNode.on(Node.EventType.MOUSE_ENTER, () => {
          this.characterInfoWindow.active = true;
          this.characterInfoWindow
            .getComponent(CharacterInfoWindow)
            .setText("机密任务：" + (<MysteriousPerson>this.data.identity).secretTaskText);
        });
        identityNode.on(
          Node.EventType.MOUSE_MOVE,
          characterInfoWindowComponent.setPosition,
          characterInfoWindowComponent
        );
        identityNode.on(Node.EventType.MOUSE_LEAVE, (event: MouseEvent) => {
          this.characterInfoWindow.active = false;
        });
      }
    } else if (this.data.identity instanceof NoIdentity) {
      identityNode.active = false;
    }
  }

  selectPlayer(player: Player) {
    if (!player.gameObject.selectable || this.selectedPlayers.limit <= 0) return;
    if (this.selectedPlayers.isSelected(player)) {
      this.selectedPlayers.deselect(player);
      ProcessEventCenter.emit(ProcessEvent.CANCEL_SELECT_PLAYER, player);
    } else {
      const flag = this.selectedPlayers.select(player);
      if (flag) {
        ProcessEventCenter.emit(ProcessEvent.SELECT_PLAYER, player);
      } else {
        const firstPlayer = this.selectedPlayers.list[0];
        if (firstPlayer) {
          this.selectedPlayers.deselect(firstPlayer);
          ProcessEventCenter.emit(ProcessEvent.CANCEL_SELECT_PLAYER, firstPlayer);
        }
        this.selectedPlayers.select(player);
        ProcessEventCenter.emit(ProcessEvent.SELECT_PLAYER, player);
      }
    }
    this.refreshPlayerSelectedState();
  }

  resetSelectPlayer() {
    this.selectedPlayers.clear();
    this.refreshPlayerSelectedState();
  }

  refreshPlayerSelectedState() {
    for (let player of this.data.playerList) {
      if (this.selectedPlayers.isSelected(player)) {
        player.gameObject.node.getComponentInChildren(OuterGlow).openOuterGlow();
      } else {
        player.gameObject.node.getComponentInChildren(OuterGlow).closeOuterGlow();
      }
    }
  }

  onStartCountDown(data: ProcessEventType.StartCountDown) {
    ProcessEventCenter.emit(ProcessEvent.STOP_COUNT_DOWN);
    if (data.playerId === 0) {
      this.tooltip.startCoundDown(data.second);
      switch (data.type) {
        case WaitingType.PLAY_CARD:
          switch (this.data.gamePhase) {
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
          this.promptReceiveMessage("情报传递到你面前，是否接收情报？");
          break;
        case WaitingType.PLAYER_DYING:
          this.promptUseChengQing("玩家濒死，是否使用澄清？", data.params.diePlayerId);
          break;
        case WaitingType.GIVE_CARD:
          this.promptDieGiveCard("你已死亡，请选择最多三张手牌交给其他角色");
          break;
        case WaitingType.USE_SKILL:
          const player = this.data.playerList[data.playerId];
          for (let skill of player.character.skills) {
            if (skill instanceof TriggerSkill) {
              skill.onTrigger(this, data.params);
            }
          }
          break;
      }
    } else {
      this.playerObjectList[data.playerId].startCoundDown(data.second);
    }

    const buttons = this.skillButtons.getComponent(SkillButtons);
    this.data.selfPlayer.character.skills.forEach((skill, index) => {
      if (skill instanceof ActiveSkill) {
        if (skill.useablePhase.indexOf(this.data.gamePhase) !== -1) {
          switch (this.data.gamePhase) {
            case GamePhase.SEND_PHASE_START:
              if (this.data.turnPlayerId === 0) {
                buttons.list[index].useable = true;
              } else {
                buttons.list[index].useable = false;
              }
              break;
            case GamePhase.MAIN_PHASE:
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

    this.seq = data.seq;
  }

  onStopCountDown() {
    this.tooltip.hide();
    this.tooltip.hideNextPhaseButton();
    this.stopSelectPlayer();
    this.clearSelectedPlayers();
    this.stopSelectHandCard();
    this.clearSelectedHandCards();
    this.handCardContainer.resetSelectCard();
  }

  onGameTurnChange(data: GameEventType.GameTurnChange) {
    this.data.playerList[
      (data.turnPlayer.id + this.data.playerList.length - 1) % this.data.playerList.length
    ].gameObject.node
      .getChildByName("SeatNumber")
      .getComponent(Label).color = color("#FFFFFF");
    data.turnPlayer.gameObject.node.getChildByName("SeatNumber").getComponent(Label).color = color("#4FC3F7");
  }

  onGamePhaseChange() {
    this.data.selfPlayer.character.skills.forEach((skill) => {
      if (skill instanceof ActiveSkill) {
        skill.gameObject.unlock();
        skill.gameObject.isOn = false;
      }
    });
  }

  onDeckCardNumberChange(data: GameEventType.DeckCardNumberChange) {
    this.deckText.getChildByName("Label").getComponent(Label).string = "牌堆剩余数量：" + data.number.toString();
  }

  drawCards(data: GameEventType.PlayerDrawCard) {
    this.cardAction.drawCards(data);
  }

  discardCards(data: GameEventType.PlayerDiscardCard) {
    this.cardAction.discardCards(data);
  }

  cardAddToHandCard(data: GameEventType.CardAddToHandCard) {
    const { player, card, from } = data;
    this.cardAction.addCardToHandCard({
      player: player,
      card: <Card>card,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerSendMessage(data: GameEventType.PlayerSendMessage) {
    this.cardAction.playerSendMessage(data);
  }

  moveCard(data: GameEventType.CardMoved) {
    this.cardAction.moveCard(data);
  }

  removeMessage(message) {
    this.cardAction.discardMessage(message);
  }

  transmitMessage(data: GameEventType.MessageTransmission) {
    this.cardAction.transmitMessage(data);
  }

  replaceMessage(data: GameEventType.MessageReplaced) {
    this.cardAction.replaceMessage(data);
  }

  playerChooseReceiveMessage(data: GameEventType.PlayerChooseReceiveMessage) {
    this.cardAction.chooseReceiveMessage(data);
  }

  playerReceiveMessage(data: GameEventType.PlayerReceiveMessage) {
    this.cardAction.receiveMessage(data);
    data.player.addMessage(data.message);
  }

  playerRemoveMessage(data: GameEventType.PlayerRemoveMessage) {
    this.cardAction.removeMessage(data);
  }

  messagePlacedIntoMessageZone(data: GameEventType.MessagePlacedIntoMessageZone) {
    const { player, message, from } = data;
    this.cardAction.addCardToMessageZone({
      player,
      card: <Card>message,
      from: from || { location: CardActionLocation.DECK },
    });
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, handCards, messages } = data;
    this.cardAction.discardCards({ player, cardList: handCards });
    this.cardAction.removeMessage({ player, messageList: messages });
  }

  playerGiveCard(data: GameEventType.PlayerGiveCard) {
    this.cardAction.giveCards(data);
  }

  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    if (data.player.character.sex === Sex.FAMALE) {
      this.audioManager.playOneShot(`audio/cards/${data.card.src}_woman`, 2);
    } else {
      this.audioManager.playOneShot(`audio/cards/${data.card.src}_man`, 2);
    }
    if (data.targetPlayer) {
      this.cardAction.showIndicantLine({
        from: { location: CardActionLocation.PLAYER, player: data.player },
        to: { location: CardActionLocation.PLAYER, player: data.targetPlayer },
      });
    }

    this.cardAction.playerPlayCard(data);
  }

  cardOnEffect(data: GameEventType.CardOnEffect) {
    const { card, handler, params } = data;
    if (handler) {
      card[handler](this, params);
    }
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const flag = data.card.onFinish(this) && data.flag !== false;
    if (flag !== false) {
      this.cardAction.afterPlayerPlayCard(data);
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
      skill[handler](this, params);
    }
  }

  afterPlayerUseSkill(skill: Skill) {
    if (!(skill instanceof PassiveSkill) && skill.gameObject) {
      skill.gameObject.unlock();
      skill.gameObject.isOn = false;
    }
  }

  cardCanPlayed(card) {
    return (
      card.availablePhases.indexOf(this.data.gamePhase) !== -1 &&
      (!this.data.selfBanned || this.data.bannedCardTypes.indexOf(card.type) === -1)
    );
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
              if (this.cardCanPlayed(card)) {
                card.onSelectedToPlay(this);
              } else {
                this.tooltip.setText("现在不能使用这张卡");
              }
            }),
        },
      ],
    });

    this.playerAction.start();
    this.startSelectHandCard({
      num: 1,
      onSelect: (card: Card) => {
        this.playerAction.next(card);
      },
      onDeselect: (card: Card) => {
        card.onDeselected(this);
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
              this.startSelectHandCard({
                num: 1,
              });
              this.tooltip.buttons.setButtons([
                {
                  text: "澄清",
                  onclick: () => {
                    resolve(null);
                  },
                  enabled: () =>
                    this.selectedHandCards.list[0] &&
                    this.selectedHandCards.list[0].type === CardType.CHENG_QING &&
                    this.data.bannedCardTypes.indexOf(CardType.CHENG_QING) === -1,
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
              const player = this.data.playerList[playerId];
              this.showCardsWindow.show({
                title: "选择一张情报弃置",
                cardList: player.getMessagesCopy(),
                limit: 1,
                buttons: [
                  {
                    text: "确定",
                    onclick: () => {
                      this.showCardsWindow.hide();
                      resolve(null);
                    },
                  },
                  {
                    text: "取消",
                    onclick: () => {
                      this.showCardsWindow.hide();
                      reject(null);
                    },
                  },
                ],
              });
            }),
        },
      ],
      complete: () => {
        NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
          use: true,
          cardId: this.selectedHandCards.list[0].id,
          targetCardId: this.showCardsWindow.selectedCards.list[0].id,
          seq: this.seq,
        });
      },
      cancel: () => {
        this.stopSelectHandCard();
        this.handCardContainer.resetSelectCard();
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
              this.startSelectHandCard({
                num: 3,
              });
              this.startSelectPlayer({
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
    this.startSelectHandCard({
      num: 1,
      onSelect: (card: Card) => {
        this.tooltip.setText("请选择一项操作");
        if (this.cardCanPlayed(card)) {
          this.tooltip.buttons.setButtons([
            {
              text: card.name,
              onclick: () => {
                card.onSelectedToPlay(this);
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
        this.stopSelectPlayer();
        this.clearSelectedPlayers();
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          card.onDeselected(this);
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
          enabled: !(this.data.lockedPlayer && this.data.lockedPlayer.id === 0) && this.data.senderId !== 0,
        },
      ]);
    };

    setTooltip();
    this.startSelectHandCard({
      num: 1,
      onSelect: (card: Card) => {
        if (this.cardCanPlayed(card)) {
          card.onSelectedToPlay(this);
        } else {
          this.tooltip.setText("现在不能使用这张卡");
        }
      },
      onDeselect: (card: Card) => {
        setTooltip();
        if (this.cardCanPlayed(card)) {
          card.onDeselected(this);
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
    this.selectedHandCards.lock();

    const actions = [
      {
        name: "selectTarget",
        handler: () =>
          new Promise((resolve, reject) => {
            switch (data.cardDir) {
              case CardDirection.LEFT:
                data.targetPlayerId = this.data.playerList.length - 1;
                resolve(null);
                break;
              case CardDirection.RIGHT:
                data.targetPlayerId = 1;
                resolve(null);
                break;
              case CardDirection.UP:
                this.tooltip.setText("请选择要传递情报的目标");
                this.tooltip.buttons.setButtons([]);
                this.startSelectPlayer({
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
            switch (card.direction) {
              case CardDirection.LEFT:
              case CardDirection.RIGHT:
                this.tooltip.setText("请选择一名角色锁定");
                this.startSelectPlayer({
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
                  switch (card.direction) {
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
          this.selectedPlayers.unlock();
          this.selectedHandCards.unlock();
          this.stopSelectHandCard();
          this.clearSelectedHandCards();
          this.stopSelectPlayer();
          this.clearSelectedPlayers();
        }, 0);
      },
    });

    this.playerAction.start();
  }

  //选择角色
  startSelectPlayer(option: {
    num?: number;
    filter?: (player: Player) => boolean;
    onSelect?: (player: Player) => void;
    onDeselect?: (player: Player) => void;
  }) {
    const { num, filter, onSelect, onDeselect } = option;
    this.selectedPlayers.limit = num || 1;
    if (filter) {
      for (let player of this.playerObjectList) {
        player.selectable = filter(player.data);
      }
    }
    if (onSelect) {
      ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, onSelect);
    }
    if (onDeselect) {
      ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_PLAYER, onDeselect);
    }
  }

  stopSelectPlayer() {
    this.selectedPlayers.limit = 0;
    for (let player of this.playerObjectList) {
      player.selectable = true;
    }
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
    ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_PLAYER);
  }

  clearSelectedPlayers() {
    this.selectedPlayers.clear();
    this.refreshPlayerSelectedState();
  }

  //选择手牌
  startSelectHandCard(option: {
    num?: number;
    filter?: (card: Card) => boolean;
    onSelect?: (card: Card) => void;
    onDeselect?: (card: Card) => void;
  }) {
    const { num, filter, onSelect, onDeselect } = option;
    this.selectedHandCards.limit = num || 1;
    // if (filter) {
    //   for (let card of this.handCardList.list) {
    //   }
    // }
    if (onSelect) {
      ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, onSelect);
    }
    if (onDeselect) {
      ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, onDeselect);
    }
  }

  stopSelectHandCard() {
    ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
    ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
  }

  clearSelectedHandCards() {
    this.selectedHandCards.limit = 0;
    this.handCardContainer.resetSelectCard();
  }
}
