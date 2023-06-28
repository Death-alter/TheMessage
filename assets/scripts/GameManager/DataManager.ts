import { _decorator, Component } from "cc";
import { GameLogList } from "../Game/GameLog/GameLogList";
import { GameData } from "../UI/Game/GameWindow/GameData";
import { NetworkEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../Event/type";
import { SyncStatus } from "./type";
import { GameLogHistory } from "../Game/GameLog/GameLogHistory";
const { ccclass, property } = _decorator;

@ccclass("DataManager")
export class DataManager extends Component {
  public gameData: GameData;
  public gameLog: GameLogList;
  public logHistory: GameLogHistory;
  public syncStatus: SyncStatus = SyncStatus.NO_SYNC;

  onLoad(): void {
    ProcessEventCenter.on(ProcessEvent.START_LOAD_GAME_SCENE, () => {
      this.gameData = new GameData();
      this.gameLog = new GameLogList();
      this.logHistory = new GameLogHistory();
      this.gameLog.logHistory = this.logHistory;
      this.gameData.registerEvents();
      this.gameLog.registerEvents();
    });

    ProcessEventCenter.on(ProcessEvent.PLAYER_WIN, () => {
      this.gameData.unregisterEvents();
      this.gameLog.unregisterEvents();
      this.gameData = null;
      this.gameLog = null;
      this.logHistory = null;
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_START, () => {
      this.syncStatus = SyncStatus.IS_SYNCING;
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_END, () => {
      this.syncStatus = SyncStatus.SYNC_COMPLETE;
    });
  }
}