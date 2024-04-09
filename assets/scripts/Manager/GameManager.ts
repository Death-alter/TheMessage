import { _decorator, Node, resources, Prefab, instantiate, find, sys } from "cc";
import { GameEventCenter, ProcessEventCenter, UIEventCenter } from "../Event/EventTarget";
import { GameEvent, ProcessEvent, UIEvent } from "../Event/type";
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
import { InitGame, StartCountDown } from "../Event/ProcessEventType";
import { PlayerActionStepManager } from "../Utils/PlayerAction/PlayerActionStepManager";
import { GameLog } from "../Components/GameLog/GameLog";
import { createIdentity } from "../Components/Identity";
import { IdentityType } from "../Components/Identity/type";
import { PlayerAction } from "../Utils/PlayerAction/PlayerAction";
import { KeyframeAnimationManager } from "../Scenes/Game/AnimationLayer/KeyframeAnimation";
import { GameLogHistory } from "../Components/GameLog/GameLogHistory";
import { init_toc } from "../../protobuf/proto";

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
  public initialized: boolean = false;

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

    KeyframeAnimationManager.reset();

    //预加载卡图
    resources.preloadDir("images/cards");
    //预加载材质
    resources.preloadDir("material");
  }

  onEnable() {
    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.onInit, this);

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
      if (this.initialized) {
        this.init();
      }
    });

    this.popupLayer.init(this);
    this.popupLayer.startRender();

    PlayerActionStepManager.init(this);
    PlayerAction.init(this);
  }

  onDisable() {
    //移除事件监听

    PlayerActionStepManager.dispose();
    PlayerAction.dispose();
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_START);
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_END);
    ProcessEventCenter.emit(ProcessEvent.START_UNLOAD_GAME_SCENE);
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.onInit, this);
    GameEventCenter.off(GameEvent.GAME_OVER, this.gameOver, this);
    // ProcessEventCenter.targetOff(this);
    ProcessEventCenter.targetOff(this.data);
    // GameEventCenter.targetOff(this);
    // GameEventCenter.targetOff(this.data);
    ProcessEventCenter.off(ProcessEvent.CONFIRM_SELECT_CHARACTER);
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
          this,
        );
      }

      this.gameLayer.init(this);
      this.animationLayer.init(this);
      this.logLayer.init(this);
      this.uiLayer.init(this);

      this.gameLayer.node.active = true;
      this.popupLayer.stopSelectCharacter();

      this.startRender();
      let str = "游戏开始，本局游戏的神秘人将从以下随机：";
      for (const task of this.data.secretTaskList) {
        str += `【${createIdentity(IdentityType.GREEN, task).name}】`;
      }
      this.gameLog.addData(new GameLog(str));
    }
  }

  onInit(data: InitGame) {
    this.data = new GameData(data);
    this.gameLog = new GameLogList();
    this.gameLog.logHistory = new GameLogHistory();
    this.gameLog.registerEvents();
    this.data.gameLog = this.gameLog;
    this.initialized = true;
    this.init();
  }

  startRender() {
    UIEventCenter.on(UIEvent.START_COUNT_DOWN, this.onStartCountDown, this);
    this.gameLayer.startRender();
    this.animationLayer.startRender();
    this.uiLayer.startRender();
  }

  stopRender() {
    UIEventCenter.on(UIEvent.START_COUNT_DOWN, this.onStartCountDown, this);
  }

  onStartCountDown(data: StartCountDown) {
    if (!data.isMultiply) {
      UIEventCenter.emit(UIEvent.STOP_COUNT_DOWN);
    }
    if (data.seq) {
      this.seq = data.seq;
    }
  }

  gameOver(data: GameEventType.GameOver) {
    UIEventCenter.emit(UIEvent.STOP_COUNT_DOWN);
    this.stopRender();
    // this.gameWindow.active = false;
    this.popupLayer.showCardsWindow.node.active = false;
    this.popupLayer.messagesWindow.node.active = false;
    this.popupLayer.showGameResult(data.players, this.isRecord);
  }

  syncHandCard(data) {
    const player = data.player;
    const card = data.card || data.cardList;

    if (player.id === 0) {
      if (card instanceof Array) {
        for (const c of card) {
          this.data.handCardList.addData(c);
        }
      } else {
        this.data.handCardList.addData(card);
      }
    }
  }
}
