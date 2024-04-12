import { _decorator, Node, Prefab, instantiate, Layout, Label, sys, color, Component, UITransform } from "cc";
import { GameEventCenter, ProcessEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, ProcessEvent, UIEvent } from "../../../Event/type";
import { HandCardContianer } from "../../../Components/Container/HandCardContianer";
import * as GameEventType from "../../../Event/GameEventType";
import { PlayerEntity } from "../../../Components/Player/PlayerEntity";
import { GamePhase } from "../../../Manager/type";
import { Player } from "../../../Components/Player/Player";
import { SelectedList } from "../../../Utils/SelectedList";
import { OuterGlow } from "../../../Components/Utils/OuterGlow";
import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../../../Components/Card/Card";
import { PlayerNetworkStatusChange, StartCountDown } from "../../../Event/ProcessEventType";
import { CardUsableStatus } from "../../../Components/Card/type";

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
  public playerEntityList: PlayerEntity[] = [];
  public selectedPlayers: SelectedList<Player> = new SelectedList<Player>();
  public handCardContainer: HandCardContianer;

  get selectedHandCards() {
    return this.manager.data.handCardList.selectedCards;
  }

  init(manager: GameManager) {
    this.manager = manager;

    //创建自己的UI
    this.playerEntityList = [];
    const selfNode = this.node.getChildByPath("Self/SelfPlayer");
    const self = instantiate(this.playerPrefab);
    selfNode.addChild(self);
    this.manager.data.playerList[0].entity = self.getComponent(PlayerEntity);
    this.manager.data.playerList[0].entity.setSeat();
    this.playerEntityList.push(this.manager.data.playerList[0].entity);

    //初始化手牌UI
    this.handCardContainer = this.handCardNode.getComponent(HandCardContianer);
    this.manager.data.handCardList.entity = this.handCardContainer;
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
      this.manager.data.playerList[i + 1].entity = player.getComponent(PlayerEntity);
      this.manager.data.playerList[i + 1].entity.setSeat();
      this.playerEntityList.push(this.manager.data.playerList[i + 1].entity);
    }

    for (let i = sideLength; i < othersCount - sideLength; i++) {
      const player = instantiate(this.playerPrefab);
      this.topPlayerNodeList.addChild(player);
      this.manager.data.playerList[i + 1].entity = player.getComponent(PlayerEntity);
      this.manager.data.playerList[i + 1].entity.setSeat();
      this.playerEntityList.push(this.manager.data.playerList[i + 1].entity);
    }

    for (let i = othersCount - sideLength; i < othersCount; i++) {
      const player = instantiate(this.playerPrefab);
      this.leftPlayerNodeList.addChild(player);
      this.manager.data.playerList[i + 1].entity = player.getComponent(PlayerEntity);
      this.manager.data.playerList[i + 1].entity.setSeat();
      this.playerEntityList.push(this.manager.data.playerList[i + 1].entity);
    }

    this.rightPlayerNodeList.getComponent(Layout).updateLayout();
    this.topPlayerNodeList.getComponent(Layout).updateLayout();
    this.leftPlayerNodeList.getComponent(Layout).updateLayout();

    for (let i = 0; i < this.manager.data.playerList.length; i++) {
      const player = this.manager.data.playerList[i];

      //绑定点击事件
      player.entity.node.on(
        Node.EventType.TOUCH_END,
        (event) => {
          this.selectPlayer(player);
        },
        this,
      );

      //角色信息展示
      const charcaterNode = player.entity.node.getChildByPath("Border/CharacterPanting");
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
      const messageZone = this.playerEntityList[i].node.getChildByPath("Border/Message");
      messageZone.on(Node.EventType.TOUCH_END, () => {
        UIEventCenter.emit(UIEvent.START_SHOW_MESSAGES, player);
      });
    }
  }

  startRender() {
    UIEventCenter.on(UIEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    UIEventCenter.on(UIEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    UIEventCenter.on(UIEvent.UNKNOWN_WAITING, this.onUnknownWaiting, this);
    ProcessEventCenter.on(ProcessEvent.PLAYER_NETWORK_STATUS_CHANGE, this.onPlayerNetworkStatusChange, this);
    GameEventCenter.on(GameEvent.GAME_PHASE_CHANGE, this.onGamePhaseChange, this);
    GameEventCenter.on(GameEvent.GAME_TURN_CHANGE, this.onGameTurnChange, this);
    GameEventCenter.on(GameEvent.DECK_CARD_NUMBER_CHANGE, this.onDeckCardNumberChange, this);
    UIEventCenter.on(UIEvent.START_SELECT_HAND_CARD, this.startSelectHandCards, this);
    UIEventCenter.on(UIEvent.STOP_SELECT_HAND_CARD, this.stopSelectHandCards, this);
    UIEventCenter.on(UIEvent.SELECT_HAND_CARD_COMPLETE, this.lockSelectHandCards, this);
    UIEventCenter.on(UIEvent.START_SELECT_PLAYER, this.startSelectPlayers, this);
    UIEventCenter.on(UIEvent.STOP_SELECT_PLAYER, this.stopSelectPlayers, this);
    UIEventCenter.on(UIEvent.SELECT_PLAYER_COMPLETE, this.lockSelectPlayers, this);
  }

  onStartCountDown(data: StartCountDown) {
    if (data.playerId !== 0) {
      this.playerEntityList[data.playerId].startCountDown(data.second);
    }
  }

  onStopCountDown() {
    this.stopSelectHandCards();
    this.stopSelectPlayers();
  }

  onUnknownWaiting(second) {
    for (const playerEntity of this.playerEntityList)
      if (playerEntity.data.id !== 0) {
        playerEntity.startCountDown(second);
      }
  }

  onGameTurnChange(data: GameEventType.GameTurnChange) {
    for (const player of this.manager.data.playerList) {
      if (player === data.turnPlayer) {
        player.entity.node.getChildByName("SeatNumber").getComponent(Label).color = color("#4FC3F7");
        player.entity.showInnerGlow("#00FF0080");
      } else {
        player.entity.hidePhaseText();
        player.entity.node.getChildByName("SeatNumber").getComponent(Label).color = color("#FFFFFF");
        player.entity.hideInnerGlow();
      }
      player.entity.setSkillOnUse(null);
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
    data.turnPlayer.entity.showPhaseText(text);
  }

  onPlayerNetworkStatusChange(data: PlayerNetworkStatusChange) {
    const player = this.manager.data.playerList[data.playerId];
    if (data.isOffline) {
      player.entity.setNetWorkStatusText("离线");
    } else if (data.isAuto) {
      player.entity.setNetWorkStatusText("托管");
    } else {
      player.entity.setNetWorkStatusText("");
    }
  }

  selectPlayer(player: Player) {
    if (!player.entity.selectable || this.selectedPlayers.limit <= 0) return;
    if (this.selectedPlayers.isSelected(player)) {
      this.selectedPlayers.deselect(player);
      UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER, player);
    } else {
      const flag = this.selectedPlayers.select(player);
      if (flag) {
        UIEventCenter.emit(UIEvent.SELECT_PLAYER, player);
      } else {
        const firstPlayer = this.selectedPlayers.list[0];
        if (firstPlayer) {
          this.selectedPlayers.deselect(firstPlayer);
          UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER, firstPlayer);
        }
        this.selectedPlayers.select(player);
        UIEventCenter.emit(UIEvent.SELECT_PLAYER, player);
      }
    }
    this.refreshPlayerSelectedState();
  }

  refreshPlayerSelectedState() {
    for (const player of this.manager.data.playerList) {
      if (this.selectedPlayers.isSelected(player)) {
        player.entity.node.getComponentInChildren(OuterGlow).openOuterGlow();
      } else {
        player.entity.node.getComponentInChildren(OuterGlow).closeOuterGlow();
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
    this.stopSelectPlayers();
    this.selectedPlayers.limit = num || 1;

    for (const player of this.playerEntityList) {
      if (filter) {
        player.selectable = filter(player.data);
      }
      player.enableSelectIdentity = false;
    }

    if (onSelect) {
      UIEventCenter.on(UIEvent.SELECT_PLAYER, onSelect);
    } else {
      UIEventCenter.off(UIEvent.SELECT_PLAYER);
    }
    if (onDeselect) {
      UIEventCenter.on(UIEvent.CANCEL_SELECT_PLAYER, onDeselect);
    } else {
      UIEventCenter.off(UIEvent.CANCEL_SELECT_PLAYER);
    }
  }

  lockSelectPlayers() {
    for (const player of this.playerEntityList) {
      player.selectable = true;
      player.enableSelectIdentity = true;
    }
    this.selectedPlayers.lock();
    UIEventCenter.off(UIEvent.SELECT_PLAYER);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_PLAYER);
  }

  stopSelectPlayers() {
    for (const player of this.playerEntityList) {
      player.selectable = true;
      player.enableSelectIdentity = true;
    }

    this.selectedPlayers.limit = 0;
    this.selectedPlayers.unlock();
    this.selectedPlayers.clear();
    this.refreshPlayerSelectedState();
    UIEventCenter.off(UIEvent.SELECT_PLAYER);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_PLAYER);
  }

  //开始选择手牌
  startSelectHandCards(option: {
    num?: number;
    filter?: (card: Card) => CardUsableStatus;
    onSelect?: (card: Card) => void;
    onDeselect?: (card: Card) => void;
  }) {
    const { num, filter, onSelect, onDeselect } = option;
    this.stopSelectHandCards();
    this.selectedHandCards.limit = num || 1;
    if (filter) {
      this.handCardContainer.setHandCardsUsable(filter);
    }
    if (onSelect) {
      UIEventCenter.on(UIEvent.SELECT_HAND_CARD, onSelect);
    }
    if (onDeselect) {
      UIEventCenter.on(UIEvent.CANCEL_SELECT_HAND_CARD, onDeselect);
    }
  }

  lockSelectHandCards() {
    this.selectedHandCards.lock();
    UIEventCenter.off(UIEvent.SELECT_HAND_CARD);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_HAND_CARD);
  }

  stopSelectHandCards() {
    this.selectedHandCards.limit = 0;
    this.selectedHandCards.unlock();
    this.handCardContainer.refreshHandCardsUseable();
    this.handCardContainer.resetSelectCard();
    UIEventCenter.off(UIEvent.SELECT_HAND_CARD);
    UIEventCenter.off(UIEvent.CANCEL_SELECT_HAND_CARD);
  }
}
