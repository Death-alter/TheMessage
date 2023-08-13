import { _decorator, Node, Prefab, instantiate, Layout, Label, sys, color, Component } from "cc";
import { GameEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, ProcessEvent, UIEvent } from "../../../Event/type";
import { HandCardContianer } from "../../../Components/Container/HandCardContianer";
import * as GameEventType from "../../../Event/GameEventType";
import { PlayerObject } from "../../../Components/Player/PlayerObject";
import { GamePhase } from "../../../Manager/type";
import { Player } from "../../../Components/Player/Player";
import { SelectedList } from "../../../Utils/SelectedList";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { PlayerNetworkStatusChange, StartCountDown } from "../../../Event/ProcessEventType";

const { ccclass, property } = _decorator;

@ccclass("GameLayer")
export class GameLayer extends Component {
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
  handCardNode: Node | null = null;

  public manager: GameManager;
  public playerObjectList: PlayerObject[] = [];
  public selectedPlayers: SelectedList<Player> = new SelectedList<Player>();
  public handCardContainer: HandCardContianer;

  get selectedHandCards() {
    return this.manager.data.handCardList.selectedCards;
  }

  init(manager: GameManager) {
    this.manager = manager;

    //创建自己的UI
    this.playerObjectList = [];
    const selfNode = this.node.getChildByPath("Self/SelfPlayer");
    const self = instantiate(this.playerPrefab);
    selfNode.addChild(self);
    this.manager.data.playerList[0].gameObject = self.getComponent(PlayerObject);
    this.playerObjectList.push(this.manager.data.playerList[0].gameObject);

    //初始化手牌UI
    this.handCardContainer = this.handCardNode.getComponent(HandCardContianer);
    this.manager.data.handCardList.gameObject = this.handCardContainer;
    this.handCardContainer.init();

    //创建其他人UI
    const othersCount = this.manager.data.playerList.length - 1;
    const sideLength = Math.floor(othersCount / 3);
    this.rightPlayerNodeList.removeAllChildren();
    this.leftPlayerNodeList.removeAllChildren();
    this.topPlayerNodeList.removeAllChildren();

    for (let i = 0; i < sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.rightPlayerNodeList.addChild(player);
      this.manager.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.manager.data.playerList[i + 1].gameObject.setSeat();
      this.playerObjectList.push(this.manager.data.playerList[i + 1].gameObject);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      this.manager.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.manager.data.playerList[i + 1].gameObject.setSeat();
      this.playerObjectList.push(this.manager.data.playerList[i + 1].gameObject);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      this.manager.data.playerList[i + 1].gameObject = player.getComponent(PlayerObject);
      this.manager.data.playerList[i + 1].gameObject.setSeat();
      this.playerObjectList.push(this.manager.data.playerList[i + 1].gameObject);
    }

    this.rightPlayerNodeList.getComponent(Layout).updateLayout();
    this.topPlayerNodeList.getComponent(Layout).updateLayout();
    this.leftPlayerNodeList.getComponent(Layout).updateLayout();

    for (let i = 0; i < this.manager.data.playerList.length; i++) {
      const player = this.manager.data.playerList[i];

      //绑定点击事件
      player.gameObject.node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          this.selectPlayer(player);
        },
        this
      );

      //角色信息展示
      const charcaterNode = player.gameObject.node.getChildByPath("Border/CharacterPanting");
      if (sys.isMobile) {
        charcaterNode.on("longtap", (event) => {
          this.manager.popupLayer.showCharacterInfo(event);
          this.manager.popupLayer.setCharacterInfoPosition(event);

          this.node.once(Node.EventType.TOUCH_START, () => {
            this.manager.popupLayer.hideCharacterInfo();
          });
        });
      } else {
        charcaterNode.on(Node.EventType.MOUSE_ENTER, (event: MouseEvent) => {
          this.manager.popupLayer.showCharacterInfo(event);
        });
        charcaterNode.on(Node.EventType.MOUSE_MOVE, (event: MouseEvent) => {
          this.manager.popupLayer.setCharacterInfoPosition(event);
        });
        charcaterNode.on(Node.EventType.MOUSE_LEAVE, (event: MouseEvent) => {
          this.manager.popupLayer.hideCharacterInfo();
        });
      }
      const messageZone = this.playerObjectList[i].node.getChildByPath("Border/Message");
      messageZone.on(Node.EventType.TOUCH_END, () => {
        UIEventCenter.emit(UIEvent.START_SHOW_MESSAGES, player);
      });
    }
  }

  startRender() {
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    ProcessEventCenter.on(ProcessEvent.UNKNOWN_WAITING, this.onUnknownWaiting, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_NETWORK_STATUS_CHANGE, this.onPlayerNetworkStatusChange, this);
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);
    GameEventCenter.on(GameEvent.GAME_TURN_CHANGE, this.onGameTurnChange, this);
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);
    UIEventCenter.on(UIEvent.START_SELECT_HAND_CARD, this.startSelectHandCards, this);
    UIEventCenter.on(UIEvent.CANCEL_SELECT_HAND_CARD, this.stopSelectHandCards, this);
    UIEventCenter.on(UIEvent.SELECT_HAND_CARD_COMPLETE, this.pauseSelectHandCards, this);
    UIEventCenter.on(UIEvent.START_SELECT_PLAYER, this.startSelectPlayers, this);
    UIEventCenter.on(UIEvent.CANCEL_SELECT_PLAYER, this.stopSelectPlayers, this);
    UIEventCenter.on(UIEvent.SELECT_PLAYER_COMPLETE, this.pauseSelectPlayers, this);
  }

  stopRender() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    ProcessEventCenter.off(ProcessEvent.UNKNOWN_WAITING, this.onUnknownWaiting, this);
    ProcessEventCenter.off(ProcessEvent.PLAYER_NETWORK_STATUS_CHANGE, this.onPlayerNetworkStatusChange, this);
    GameEventCenter.off(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);
    GameEventCenter.off(GameEvent.GAME_TURN_CHANGE, this.onGameTurnChange, this);
    GameEventCenter.off(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);
    UIEventCenter.off(UIEvent.START_SELECT_HAND_CARD, this.startSelectHandCards, this);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_HAND_CARD, this.stopSelectHandCards, this);
    UIEventCenter.off(UIEvent.SELECT_HAND_CARD_COMPLETE, this.pauseSelectHandCards, this);
    UIEventCenter.off(UIEvent.START_SELECT_PLAYER, this.startSelectPlayers, this);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_PLAYER, this.stopSelectPlayers, this);
    UIEventCenter.off(UIEvent.SELECT_PLAYER_COMPLETE, this.pauseSelectPlayers, this);
  }

  onStartCountDown(data: StartCountDown) {
    if (data.playerId !== 0) {
      this.playerObjectList[data.playerId].startCoundDown(data.second);
    }
  }

  onStopCountDown() {
    this.stopSelectHandCards();
    this.stopSelectPlayers();
  }

  onUnknownWaiting(second) {
    for (let playerObject of this.playerObjectList)
      if (playerObject.data.id !== 0) {
        playerObject.startCoundDown(second);
      }
  }

  onGameTurnChange(data: GameEventType.GameTurnChange) {
    for (let player of this.manager.data.playerList) {
      if (player === data.turnPlayer) {
        player.gameObject.node.getChildByName("SeatNumber").getComponent(Label).color = color("#4FC3F7");
      } else {
        player.gameObject.hidePhaseText();
        player.gameObject.node.getChildByName("SeatNumber").getComponent(Label).color = color("#FFFFFF");
      }
    }
  }

  onGamePhaseChange(data: GameEventType.GamePhaseChange) {
    let text = "";
    switch (data.phase) {
      case GamePhase.DRAW_PHASE:
        text = "摸 牌 阶 段";
        break;
      case GamePhase.MAIN_PHASE:
        text = "出 牌 阶 段";
        break;
      case GamePhase.SEND_PHASE_START:
      case GamePhase.SEND_PHASE:
        text = "传 递 阶 段";
        break;
      case GamePhase.FIGHT_PHASE:
        text = "争 夺 阶 段";
        break;
      case GamePhase.RECEIVE_PHASE:
        text = "接 收 阶 段";
        break;
    }
    data.turnPlayer.gameObject.showPhaseText(text);
  }

  onPlayerNetworkStatusChange(data: PlayerNetworkStatusChange) {
    const player = this.manager.data.playerList[data.playerId];
    if (data.isOffline) {
      player.gameObject.setNetWorkStatusText("离线");
    } else if (data.isAuto) {
      player.gameObject.setNetWorkStatusText("托管");
    } else {
      player.gameObject.setNetWorkStatusText("");
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

  refreshPlayerSelectedState() {
    for (let player of this.manager.data.playerList) {
      if (this.selectedPlayers.isSelected(player)) {
        player.gameObject.node.getComponentInChildren(OuterGlow).openOuterGlow();
      } else {
        player.gameObject.node.getComponentInChildren(OuterGlow).closeOuterGlow();
      }
    }
  }

  onDeckCardNumberChange(data: GameEventType.DeckCardNumberChange) {
    this.deckText.getChildByName("Label").getComponent(Label).string = "牌堆剩余数量：" + data.number.toString();
  }

  //选择角色
  startSelectPlayers(option: {
    num?: number;
    filter?: (player: Player) => boolean;
    onSelect?: (player: Player) => void;
    onDeselect?: (player: Player) => void;
  }) {
    const { num, filter, onSelect, onDeselect } = option;
    this.selectedPlayers.limit = num || 1;
    this.selectedPlayers.unlock();
    if (filter) {
      for (let player of this.playerObjectList) {
        player.selectable = filter(player.data);
      }
    }
    if (onSelect) {
      ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, onSelect);
    } else {
      ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
    }
    if (onDeselect) {
      ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_PLAYER, onDeselect);
    } else {
      ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_PLAYER);
    }
  }

  pauseSelectPlayers() {
    for (let player of this.playerObjectList) {
      player.selectable = true;
    }
    this.selectedPlayers.lock();
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
    ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_PLAYER);
  }

  stopSelectPlayers() {
    this.selectedPlayers.limit = 0;
    this.selectedPlayers.unlock();
    this.selectedPlayers.clear();
    this.refreshPlayerSelectedState();
    this.pauseSelectPlayers();
  }

  //开始选择手牌
  startSelectHandCards(option: {
    num?: number;
    filter?: (card: Card) => boolean;
    onSelect?: (card: Card) => void;
    onDeselect?: (card: Card) => void;
  }) {
    const { num, filter, onSelect, onDeselect } = option;
    this.selectedHandCards.limit = num || 1;
    this.selectedHandCards.unlock();
    if (onSelect) {
      ProcessEventCenter.on(ProcessEvent.SELECT_HAND_CARD, onSelect);
    } else {
      ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD, onSelect);
    }
    if (onDeselect) {
      ProcessEventCenter.on(ProcessEvent.CANCEL_SELECT_HAND_CARD, onDeselect);
    } else {
      ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD, onDeselect);
    }
  }

  pauseSelectHandCards() {
    this.selectedHandCards.lock();
    ProcessEventCenter.off(ProcessEvent.SELECT_HAND_CARD);
    ProcessEventCenter.off(ProcessEvent.CANCEL_SELECT_HAND_CARD);
  }

  stopSelectHandCards() {
    this.selectedHandCards.limit = 0;
    this.selectedHandCards.unlock();
    this.handCardContainer.resetSelectCard();
    this.pauseSelectHandCards();
  }
}
