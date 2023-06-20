import { _decorator, Component, Node, resources, Prefab, instantiate, find } from "cc";
import { SelectCharacter } from "../UI/Game/SelectCharacterWindow/SelectCharacter";
import { GameEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, ProcessEvent } from "../Event/type";
import { createIdentity } from "../Game/Identity";
import { IdentityType, SecretTaskType } from "../Game/Identity/type";
import { CharacterType } from "../Game/Character/type";
import { GameData } from "../UI/Game/GameWindow/GameData";
import * as ProcessEventType from "../Event/ProcessEventType";
import * as GameEventType from "../Event/GameEventType";
import { GameLogList } from "../Game/GameLog/GameLogList";
import GamePools from "./GamePools";
import { CardObject } from "../Game/Card/CardObject";
import { CardGroupObject } from "../Game/Container/CardGroupObject";
import { GameLogMessageObject } from "../Game/GameLog/GameLogMessageObject";
import { GameUI } from "../UI/Game/GameWindow/GameUI";
import { GameLogContainer } from "../Game/GameLog/GameLogContainer";
import { Winner } from "../UI/Game/WinnerWindow/Winner";
import { ShowCardsWindow } from "../UI/Game/ShowCardsWindow/ShowCardsWindow";
import { DataManager } from "./DataManager";
import { SyncStatus } from "./type";

const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property(Node)
  selectCharacterWindow: Node | null = null;
  @property(Node)
  gameWindow: Node | null = null;
  @property(Node)
  gameResultWindow: Node | null = null;
  @property(Node)
  logContainer: Node | null = null;
  @property(Prefab)
  cardPrefab: Prefab | null = null;
  @property(Prefab)
  logPrefab: Prefab | null = null;
  @property(Node)
  showCardsWindow: Node | null = null;
  @property(Node)
  cardGroupNode: Node | null;

  public gameData: GameData;
  public gameLog: GameLogList;
  public syncStatus: SyncStatus;

  onLoad() {
    //初始化GamePools
    GamePools.init({
      card: instantiate(this.cardPrefab).getComponent(CardObject),
      cardGroup: this.cardGroupNode.getComponent(CardGroupObject),
      logMessage: instantiate(this.logPrefab).getComponent(GameLogMessageObject),
    });

    const gameUI = this.gameWindow.getComponent(GameUI);
    const dataManager = find("Resident").getComponent(DataManager);
    this.gameData = dataManager.gameData;
    this.gameLog = dataManager.gameLog;
    this.syncStatus = dataManager.syncStatus;
    this.gameData.gameObject = gameUI;
    this.gameLog.gameObject = this.logContainer.getComponent(GameLogContainer);
    this.gameData.gameLog = this.gameLog;

    gameUI.showCardsWindow = this.showCardsWindow.getComponent(ShowCardsWindow);

    //预加载卡图
    resources.preloadDir("images/cards");
    //预加载材质
    resources.preloadDir("material");
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    ProcessEventCenter.on(ProcessEvent.START_SELECT_CHARACTER, this.startSelectCharacter, this);

    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.initGame, this);

    //游戏结束
    GameEventCenter.on(GameEvent.GAME_OVER, this.gameOver, this);
  }

  onDisable() {
    //移除事件监听
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_START);
    ProcessEventCenter.off(ProcessEvent.RECONNECT_SYNC_END);
    ProcessEventCenter.off(ProcessEvent.START_SELECT_CHARACTER, this.startSelectCharacter, this);
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.initGame, this);
    GameEventCenter.off(GameEvent.GAME_OVER, this.gameOver, this);
  }

  startSelectCharacter(data: ProcessEventType.StartSelectCharacter) {
    if (this.syncStatus === SyncStatus.NO_SYNC) {
      this.selectCharacterWindow.getComponent(SelectCharacter).init({
        identity: createIdentity((<number>data.identity) as IdentityType, (<number>data.secretTask) as SecretTaskType),
        roles: (<number[]>data.characterIdList) as CharacterType[],
        waitingSecond: data.waitingSecond,
      });
    } else {
      this.gameWindow.active = true;
      this.gameData.gameObject.init();
      this.gameData.gameObject.startRender();
    }
  }

  initGame(data: ProcessEventType.InitGame) {
    if (this.syncStatus === SyncStatus.NO_SYNC) {
      this.selectCharacterWindow.getComponent(SelectCharacter).hide();
    }

    if (this.syncStatus !== SyncStatus.IS_SYNCING) {
      this.gameWindow.active = true;
      this.gameData.gameObject.init();
      this.gameData.gameObject.startRender();
    }
  }

  gameOver(data: GameEventType.GameOver) {
    this.gameData.gameObject.stopRender();
    this.gameWindow.active = false;
    this.gameWindow.getComponent(GameUI).showCardsWindow.node.active = false;
    this.gameResultWindow.getComponent(Winner).init(data.players);
    this.gameResultWindow.active = true;
  }
}
