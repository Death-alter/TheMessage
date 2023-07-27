import { _decorator, Component, director } from "cc";
import { GameLogList } from "../Game/GameLog/GameLogList";
import { GameData } from "../UI/Game/GameWindow/GameData";
import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../Event/EventTarget";
import { GameEvent, NetworkEventToC, NetworkEventToS, ProcessEvent } from "../Event/type";
import { SyncStatus } from "./type";
import { GameLogHistory } from "../Game/GameLog/GameLogHistory";
const { ccclass, property } = _decorator;

@ccclass("DataManager")
export class DataManager extends Component {
  public gameData: GameData;
  public gameLog: GameLogList;
  public logHistory: GameLogHistory;
  public syncStatus: SyncStatus = SyncStatus.NO_SYNC;
  public isRecord: boolean = false;

  onLoad(): void {
    ProcessEventCenter.on(
      ProcessEvent.START_LOAD_GAME_SCENE,
      () => {
        this.createData();
        director.loadScene("game", () => {
          NetworkEventCenter.emit(NetworkEventToS.GAME_INIT_FINISH_TOS);
        });
      },
      this
    );

    NetworkEventCenter.on(
      NetworkEventToS.DISPLAY_RECORD_TOS,
      () => {
        this.isRecord = true;
      },
      this
    );

    GameEventCenter.on(GameEvent.GAME_OVER, this.clearData, this);
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
    this.isRecord = false;
  }

  resetData() {
    this.clearData();
    this.createData();
  }
}
