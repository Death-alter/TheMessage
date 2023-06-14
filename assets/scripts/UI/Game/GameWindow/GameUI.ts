import { _decorator, Node, Prefab, instantiate, Layout, Label, sys } from "cc";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { HandCardContianer } from "../../../Game/Container/HandCardContianer";
import { CardAction } from "../../../GameManager/CardAction";
import { Tooltip } from "../../../GameManager/Tooltip";
import * as GameEventType from "../../../Event/GameEventType";
import * as ProcessEventType from "../../../Event/ProcessEventType";
import { HandCardList } from "../../../Game/Container/HandCardList";
import { PlayerObject } from "../../../Game/Player/PlayerObject";
import { GameObject } from "../../../GameObject";
import { GameData } from "./GameData";
import { Card } from "../../../Game/Card/Card";
import { GamePhase, WaitingType } from "../../../GameManager/type";
import { ShowCardsWindow } from "../ShowCardsWindow/ShowCardsWindow";
import { Player } from "../../../Game/Player/Player";
import { SelectedList } from "../../../Utils/SelectedList";
import { CardDirection, CardType } from "../../../Game/Card/type";
import { OuterGlow } from "../../../Utils/OuterGlow";
import { GameLogList } from "../../../Game/GameLog/GameLogList";
import { ActiveSkill, TriggerSkill } from "../../../Game/Skill/Skill";
import { SkillButtons } from "./SkillButtons";

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
  skillButtons: Node | null = null;

  public cardAction: CardAction;
  public tooltip: Tooltip;
  public gameLog: GameLogList;
  public handCardList: HandCardList;
  public playerObjectList: PlayerObject[] = [];
  public seq: number;
  public showCardsWindow: ShowCardsWindow;
  public selectedPlayers: SelectedList<Player> = new SelectedList<Player>();

  get selectedHandCards() {
    return this.handCardList.selectedCards;
  }

  onLoad() {
    this.cardAction = this.cardActionNode.getComponent(CardAction);
    this.tooltip = this.toolTipNode.getComponent(Tooltip);
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

  onEnable() {
    //读条
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);

    //收到初始化
    GameEventCenter.on(GameEvent.GAME_INIT, this.init, this);

    //收到游戏开始
    // GameEventCenter.once(GameEvent.GAME_START, (data: GameEventType.GameStart) => {});

    // GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);

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

    //卡牌结算完
    GameEventCenter.on(GameEvent.AFTER_PLAYER_PLAY_CARD, this.afterPlayerPlayCard, this);

    //玩家开始传递情报
    GameEventCenter.on(GameEvent.PLAYER_SEND_MESSAGE, this.playerSendMessage, this);

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
    GameEventCenter.on(GameEvent.PLAYER_REOMVE_MESSAGE, this.playerRemoveMessage, this);

    //玩家死前
    // GameEventCenter.on(GameEvent.PLAYER_BEFORE_DEATH, (data: GameEventType.PlayerBeforeDeath) => {});

    //玩家死亡
    GameEventCenter.on(GameEvent.PLAYER_DIE, this.playerDie, this);

    //玩家给牌
    GameEventCenter.on(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard, this);
  }

  onDisable() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown);
    GameEventCenter.off(GameEvent.GAME_INIT, this.init);
    // GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange);
    GameEventCenter.off(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange);
    GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.drawCards);
    GameEventCenter.off(GameEvent.PLAYER_DISCARD_CARD, this.discardCards);
    GameEventCenter.off(GameEvent.PLAYER_PLAY_CARD, this.playerPlayCard);
    GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.cardAddToHandCard);
    GameEventCenter.off(GameEvent.MESSAGE_TRANSMISSION, this.transmitMessage);
    GameEventCenter.off(GameEvent.MESSAGE_REPLACED, this.replaceMessage);
    GameEventCenter.off(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, this.messagePlacedIntoMessageZone);
    GameEventCenter.off(GameEvent.PLAYER_CHOOSE_RECEIVE_MESSAGE, this.playerChooseReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_RECEIVE_MESSAGE, this.playerReceiveMessage);
    GameEventCenter.off(GameEvent.PLAYER_REOMVE_MESSAGE, this.playerRemoveMessage);
    GameEventCenter.off(GameEvent.PLAYER_DIE, this.playerDie);
    GameEventCenter.off(GameEvent.PLAYER_GIVE_CARD, this.playerGiveCard);
  }

  init(data: GameEventType.GameInit) {
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

    //创建自己的UI
    const selfNode = this.node.getChildByPath("Self/Player");
    data.playerList[0].gameObject = selfNode.getComponent(PlayerObject);
    this.playerObjectList.push(data.playerList[0].gameObject);
    this.skillButtons.getComponent(SkillButtons).init(this.data, this.data.selfPlayer.character.skills);

    //初始化手牌UI
    this.handCardList = new HandCardList(this.handCardUI.getComponent(HandCardContianer));
    this.handCardList.gameObject.init();
    this.cardAction.handCardList = this.handCardList;

    //创建其他人UI
    const othersCount = data.playerList.length - 1;
    const sideLength = Math.floor(othersCount / 3);

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.playerObjectList.push(data.playerList[i + 1].gameObject);
    }

    this.rightPlayerNodeList.getComponent(Layout).updateLayout();
    this.topPlayerNodeList.getComponent(Layout).updateLayout();
    this.leftPlayerNodeList.getComponent(Layout).updateLayout();

    //绑定点击事件
    for (let i = 0; i < data.playerList.length; i++) {
      this.playerObjectList[i].node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          this.selectPlayer(data.playerList[i]);
        },
        this
      );
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
              this.promotUseHandCard("出牌阶段，请选择要使用的卡牌");
              break;
            case GamePhase.FIGHT_PHASE:
              this.tooltip.setNextPhaseButtonText("跳过");
              this.tooltip.showNextPhaseButton();
              this.promotUseHandCard("争夺阶段，请选择要使用的卡牌");
              break;
          }
          break;
        case WaitingType.SEND_MESSAGE:
          this.promotSendMessage("传递阶段，请选择要传递的情报或要使用的卡牌");
          break;
        case WaitingType.RECEIVE_MESSAGE:
          this.promotReceiveMessage("情报传递到你面前，是否接收情报？");
          break;
        case WaitingType.PLAYER_DYING:
          this.promotUseCengQing("玩家濒死，是否使用澄清？", data.params.diePlayerId);
          break;
        case WaitingType.GIVE_CARD:
          this.promotDieGiveCard("你已死亡，请选择最多三张手牌交给其他角色");
          break;
        case WaitingType.USE_SKILL:
          const player = this.data.playerList[data.playerId];
          for (let skill of player.character.skills) {
            if (skill instanceof TriggerSkill) {
              skill.onTrigger(this.data, data.params);
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
            case GamePhase.MAIN_PHASE:
              if (this.data.turnPlayerId === 0) {
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

    this.seq = data.seq;
  }

  onStopCountDown() {
    this.tooltip.hide();
    this.tooltip.hideNextPhaseButton();
    this.stopSelectPlayer();
    this.clearSelectedPlayers();
    this.stopSelectHandCard();
    this.clearSelectedHandCards();
    (<HandCardContianer>this.handCardList.gameObject).resetSelectCard();
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
    this.cardAction.addCardToHandCard({
      player: data.player,
      cards: [data.card],
      from: { location: data.from },
    });
  }

  playerSendMessage(data: GameEventType.PlayerSendMessage) {
    if (data.player.id === 0) {
      this.handCardList.selectedCards.limit = 0;
      (<HandCardContianer>this.handCardList.gameObject).resetSelectCard();
    }
    this.cardAction.playerSendMessage(data);
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
    this.cardAction.receiveMessage(data).then(() => {
      data.player.addMessage(data.message);
    });
  }

  playerRemoveMessage(data: GameEventType.PlayerRemoveMessage) {
    this.cardAction.removeMessage(data);
  }

  messagePlacedIntoMessageZone(data: GameEventType.MessagePlacedIntoMessageZone) {
    this.cardAction.messagePlacedIntoMessageZone(data);
  }

  playerDie(data: GameEventType.PlayerDie) {
    const { player, handCards, messages } = data;
    this.cardAction.discardCards({ player, cardList: handCards });
    this.cardAction.removeMessage({ player, messageList: messages });
  }

  playerGiveCard(data: GameEventType.PlayerGiveCard) {
    // if (data.player.id === 0) {
    //   this.handCardList.selectedCards.limit = 0;
    //   (<HandCardContianer>this.handCardList.gameObject).resetSelectCard();
    // }
    this.cardAction.giveCards(data);
  }

  playerPlayCard(data: GameEventType.PlayerPlayCard) {
    if (data.player.id === 0) {
      this.handCardList.selectedCards.limit = 0;
    }
    this.cardAction.playerPlayCard(data);
  }

  afterPlayerPlayCard(data: GameEventType.AfterPlayerPlayCard) {
    const flag = data.card.onFinish(this.data) && data.flag !== false;
    if (flag !== false) {
      this.cardAction.afterPlayerPlayCard(data);
    }
  }

  promotUseHandCard(tooltipText) {
    this.tooltip.setText(tooltipText);
    this.tooltip.buttons.setButtons([]);
    this.startSelectHandCard({
      num: 1,
      onSelect: (card: Card) => {
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          card.onSelectedToPlay(this.data, this.tooltip);
        } else {
          this.tooltip.setText("现在不能使用这张卡");
        }
      },
      onDeselect: (card: Card) => {
        this.tooltip.setText(tooltipText);
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          card.onDeselected(this.data);
        }
      },
    });
  }

  promotUseCengQing(tooltipText, playerId) {
    this.tooltip.setText(tooltipText);
    const player = this.data.playerList[playerId];
    this.startSelectHandCard({
      num: 1,
    });
    this.tooltip.buttons.setButtons([
      {
        text: "澄清",
        onclick: () => {
          this.showCardsWindow.show({
            title: "选择一张情报弃置",
            cardList: player.getMessagesCopy(),
            limit: 1,
            buttons: [
              {
                text: "确定",
                onclick: () => {
                  NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
                    use: true,
                    cardId: this.handCardList.selectedCards.list[0].id,
                    targetCardId: this.showCardsWindow.selectedCards.list[0].id,
                    seq: this.seq,
                  });
                  this.showCardsWindow.hide();
                },
              },
              {
                text: "取消",
                onclick: () => {
                  this.showCardsWindow.hide();
                },
              },
            ],
          });
        },
        enabled: () =>
          this.handCardList.selectedCards.list[0] &&
          this.handCardList.selectedCards.list[0].type === CardType.CHENG_QING,
      },
      {
        text: "取消",
        onclick: () => {
          this.handCardList.selectedCards.limit = 0;
          (<HandCardContianer>this.handCardList.gameObject).resetSelectCard();
          NetworkEventCenter.emit(NetworkEventToS.CHENG_QING_SAVE_DIE_TOS, {
            use: false,
            seq: this.seq,
          });
        },
      },
    ]);
  }

  async promotDieGiveCard(tooltipText) {
    this.tooltip.setText(tooltipText);
    this.startSelectHandCard({
      num: 3,
    });
    this.startSelectPlayer({
      num: 1,
      filter: (player) => player.id !== 0,
    });
    await (() =>
      new Promise((resolve, reject) => {
        this.tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
                targetPlayerId: this.selectedPlayers.list[0].id,
                cardId: this.selectedHandCards.list.map((card) => card.id),
                seq: this.seq,
              });
              resolve(null);
            },
            enabled: () => this.selectedHandCards.list.length > 0 && this.selectedPlayers.list.length > 0,
          },
          {
            text: "取消",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.DIE_GIVE_CARD_TOS, {
                targetPlayerId: 0,
                cardId: [],
                seq: this.seq,
              });
              resolve(null);
            },
          },
        ]);
      }))();
  }

  promotSendMessage(tooltipText) {
    this.tooltip.setText(tooltipText);
    this.startSelectHandCard({
      num: 1,
      onSelect: (card: Card) => {
        console.log(1);
        this.tooltip.setText("请选择一项操作");
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          this.tooltip.buttons.setButtons([
            {
              text: card.name,
              onclick: () => {
                card.onSelectedToPlay(this.data, this.tooltip);
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
          card.onDeselected(this.data);
        }
      },
    });
  }

  promotReceiveMessage(tooltipText) {
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
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          card.onSelectedToPlay(this.data, this.tooltip);
        } else {
          this.tooltip.setText("现在不能使用这张卡");
        }
      },
      onDeselect: (card: Card) => {
        setTooltip();
        if (card.availablePhases.indexOf(this.data.gamePhase) !== -1) {
          card.onDeselected(this.data);
        }
      },
    });
  }

  async doSendMessage() {
    const card = this.handCardList.selectedCards.list[0];
    const data: any = {
      cardId: card.id,
      lockPlayerId: [],
      cardDir: card.direction,
      seq: this.seq,
    };

    await (() => {
      return new Promise((resolve, reject) => {
        switch (card.direction) {
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
      });
    })();

    if (card.lockable) {
      await (() => {
        return new Promise((resolve, reject) => {
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
                this.handCardList.selectedCards.limit = 0;
                resolve(null);
              },
              enabled: () => {
                return this.selectedPlayers.list.length === 1;
              },
            },
            {
              text: "不锁定",
              onclick: () => {
                this.handCardList.selectedCards.limit = 0;
                resolve(null);
              },
            },
          ]);
        });
      })();
    }

    NetworkEventCenter.emit(NetworkEventToS.SEND_MESSAGE_CARD_TOS, data);

    this.scheduleOnce(() => {
      this.selectedPlayers.unlock();
      this.stopSelectHandCard();
      this.clearSelectedHandCards();
      this.stopSelectPlayer();
      this.clearSelectedPlayers();
    }, 0);
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
      ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, onDeselect);
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
    (<HandCardContianer>this.handCardList.gameObject).resetSelectCard();
  }
}
