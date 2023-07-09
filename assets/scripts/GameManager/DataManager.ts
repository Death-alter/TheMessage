import { _decorator, Component, director, find } from "cc";
import { GameLogList } from "../Game/GameLog/GameLogList";
import { GameData } from "../UI/Game/GameWindow/GameData";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, NetworkEventToC, ProcessEvent } from "../Event/type";
import { SyncStatus } from "./type";
import { GameLogHistory } from "../Game/GameLog/GameLogHistory";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("DataManager")
export class DataManager extends Component {
  public gameData: GameData;
  public gameLog: GameLogList;
  public logHistory: GameLogHistory;
  public syncStatus: SyncStatus = SyncStatus.NO_SYNC;

  onLoad(): void {
    ProcessEventCenter.on(ProcessEvent.START_LOAD_GAME_SCENE, this.createData, this);

    GameEventCenter.on(GameEvent.GAME_OVER, this.clearData, this);

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_START, () => {
      this.syncStatus = SyncStatus.IS_SYNCING;
      this.createData();
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_END, () => {
      this.syncStatus = SyncStatus.SYNC_COMPLETE;
      director.loadScene("game", () => {
        find("Canvas").getComponent(GameManager).initGame();
      });
    });
  }

  createData() {
    this.gameData = new GameData();
    this.gameLog = new GameLogList();
    this.gameData.gameLog = this.gameLog;
    this.logHistory = new GameLogHistory();
    this.gameLog.logHistory = this.logHistory;
    this.gameData.registerEvents();
    this.gameLog.registerEvents();
  }

  clearData() {
    this.gameData.unregisterEvents();
    this.gameLog.unregisterEvents();
    this.gameData = null;
    this.gameLog = null;
    this.logHistory = null;
  }

  resetData() {
    this.clearData();
    this.createData();
  }
}
