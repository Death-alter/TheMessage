import { _decorator, Component } from "cc";
import { GameLogList } from "../Game/GameLog/GameLogList";
import { GameData } from "../UI/Game/GameWindow/GameData";
import { NetworkEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../Event/type";
import { SyncStatus } from "./type";
const { ccclass, property } = _decorator;

@ccclass("DataManager")
export class DataManager extends Component {
  public gameData: GameData;
  public gameLog: GameLogList;
  public syncStatus: SyncStatus = SyncStatus.NO_SYNC;

  onLoad(): void {
    NetworkEventCenter.on(NetworkEventToC.WAIT_FOR_SELECT_ROLE_TOC, () => {
      this.gameData = new GameData();
      this.gameLog = new GameLogList();
      this.gameData.registerEvents();
      this.gameLog.registerEvents();
    });

    NetworkEventCenter.on(NetworkEventToC.NOTIFY_WINNER_TOC, () => {
      this.gameData.unregisterEvents();
      this.gameLog.unregisterEvents();
      this.gameData = null;
      this.gameLog = null;
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_START, () => {
      this.syncStatus = SyncStatus.IS_SYNCING;
    });

    ProcessEventCenter.on(ProcessEvent.RECONNECT_SYNC_END, () => {
      this.syncStatus = SyncStatus.SYNC_COMPLETE;
    });
  }
}
