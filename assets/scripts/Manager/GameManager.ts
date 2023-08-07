import { _decorator, Node, resources, Prefab, instantiate, find, sys } from "cc";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../Event/type";
import { GameData } from "./GameData";
import * as GameEventType from "../Event/GameEventType";
import { GameLogList } from "../Components/GameLog/GameLogList";
import GamePools from "../Components/Pool/GamePools";
import { CardGroupObject } from "../Components/Container/CardGroupObject";
import { GameLogMessageObject } from "../Components/GameLog/GameLogMessageObject";
import { DataManager } from "./DataManager";
import { SyncStatus } from "./type";
import { CardObject } from "../Components/Card/CardObject";
import { GameObject } from "../GameObject";
import { GameLayer } from "../Scenes/Game/GameLayer/GameLayer";
import { AnimationLayer } from "../Scenes/Game/AnimationLayer/AnimationLayer";
import { LogLayer } from "../Scenes/Game/LogLayer/LogLayer";
import { PopupLayer } from "../Scenes/Game/PopupLayer/PopupLayer";
import { UILayer } from "../Scenes/Game/UILayer/UILayer";
import { StartCountDown } from "../Event/ProcessEventType";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends GameObject<GameData> {
  @property(Node)
  gameLayerNode: Node | null = null;
  @property(Node)
  animationLayerNode: Node | null = null;
  @property(Node)
  logLayerNode: Node | null = null;
  @property(Node)
  uiLayerNode: Node | null = null;
  @property(Node)
  popupLayerNode: Node | null = null;

  @property(Prefab)
  cardPrefab: Prefab | null = null;
  @property(Prefab)
  logPrefab: Prefab | null = null;
  @property(Prefab)
  showCardWindowPrefab: Prefab | null = null;
  @property(Node)
  cardGroupNode: Node | null;

  public gameLayer: GameLayer;
  public animationLayer: AnimationLayer;
  public logLayer: LogLayer;
  public uiLayer: UILayer;
  public popupLayer: PopupLayer;

  public gameLog: GameLogList;
  public syncStatus: SyncStatus = SyncStatus.NO_SYNC;
  public isRecord: boolean = false;
  public seq: number = 0;

  get tooltip() {
    return this.uiLayer.tooltip;
  }

  get showCardsWindow() {
    return this.popupLayer.showCardsWindow;
  }

  get selectedPlayers() {
    return this.gameLayer.selectedPlayers;
  }

  get selectedHandCards() {
    return this.gameLayer.selectedHandCards;
  }

  onLoad() {
    //初始化GamePools
    GamePools.init({
      card: instantiate(this.cardPrefab).getComponent(CardObject),
      cardGroup: this.cardGroupNode.getComponent(CardGroupObject),
      logMessage: instantiate(this.logPrefab).getComponent(GameLogMessageObject),
    });

    this.gameLayer = this.gameLayerNode.getComponent(GameLayer);
    this.animationLayer = this.animationLayerNode.getComponent(AnimationLayer);
    this.logLayer = this.logLayerNode.getComponent(LogLayer);
    this.uiLayer = this.uiLayerNode.getComponent(UILayer);
    this.popupLayer = this.popupLayerNode.getComponent(PopupLayer);

    const dataManager = find("Resident").getComponent(DataManager);
    this.data = dataManager.gameData;
    this.isRecord = dataManager.isRecord;
    this.gameLog = dataManager.gameLog;

    this.gameLayer.node.active = false;

    //预加载卡图
    resources.preloadDir("images/cards");
    //预加载材质
    resources.preloadDir("material");
  }

  onEnable() {
    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.init, this);

    //游戏结束
    GameEventCenter.on(GameEvent.GAME_OVER, this.gameOver, this);

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_START, () => {
      this.syncStatus = SyncStatus.IS_SYNCING;
      GameEventCenter.on(GameEvent.CARD_ADD_TO_HAND_CARD, this.syncHandCard, this);
      GameEventCenter.on(GameEvent.PLAYER_DRAW_CARD, this.syncHandCard, this);
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_END, () => {
      this.syncStatus = SyncStatus.SYNC_COMPLETE;
      GameEventCenter.off(GameEvent.CARD_ADD_TO_HAND_CARD, this.syncHandCard, this);
      GameEventCenter.off(GameEvent.PLAYER_DRAW_CARD, this.syncHandCard, this);
      this.init();
    });

    this.popupLayer.init(this);
    this.popupLayer.startRender();
  }

  onDisable() {
    //移除事件监听
    this.popupLayer.stopRender();
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_START);
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_END);
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.init, this);
    GameEventCenter.off(GameEvent.GAME_OVER, this.gameOver, this);
  }

  init() {
    if (this.syncStatus !== SyncStatus.IS_SYNCING) {
      if (sys.isMobile) {
        //展示卡牌窗口
        this.node.on(
          Node.EventType.TOUCH_START,
          () => {
            this.popupLayer.hideCardInfo();
          },
          this
        );
      }

      this.gameLayer.init(this);
      this.animationLayer.init(this);
      this.logLayer.init(this);
      this.uiLayer.init(this);

      this.gameLayer.node.active = true;
      this.popupLayer.stopSelectCharacter();

      this.startRender();
    }
  }

  startRender() {
    ProcessEventCenter.on(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.on(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    this.gameLayer.startRender();
    this.animationLayer.startRender();
    this.logLayer.startRender();
    this.uiLayer.startRender();
  }

  stopRender() {
    ProcessEventCenter.off(ProcessEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    ProcessEventCenter.off(ProcessEvent.STOP_COUNT_DOWN, this.onStopCountDown, this);
    this.gameLayer.stopRender();
    this.animationLayer.stopRender();
    this.logLayer.stopRender();
    this.uiLayer.stopRender();
  }

  onStartCountDown(data: StartCountDown) {
    ProcessEventCenter.emit(ProcessEvent.STOP_COUNT_DOWN);
    this.seq = data.seq;
  }
  onStopCountDown() {}

  gameOver(data: GameEventType.GameOver) {
    this.stopRender();
    // this.gameWindow.active = false;
    this.popupLayer.showCardsWindow.node.active = false;
    this.popupLayer.messagesWindow.node.active = false;
    this.popupLayer.showGameResult(
      data.players.sort((a, b) => Number(b.isWinner) - Number(a.isWinner)),
      this.isRecord
    );
  }

  syncHandCard(data) {
    const player = data.player;
    const card = data.card || data.cardList;

    if (player.id === 0) {
      if (card instanceof Array) {
        for (let c of card) {
          this.data.handCardList.addData(c);
        }
      } else {
        this.data.handCardList.addData(card);
      }
    }
  }
}
