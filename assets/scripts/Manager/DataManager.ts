import { _decorator, Component, director } from "cc";
import { GameLogList } from "../Components/GameLog/GameLogList";
import { GameData } from "./GameData";
import {
  DataEventCenter,
  GameEventCenter,
  NetworkEventCenter,
  ProcessEventCenter,
  UIEventCenter,
} from "../Event/EventTarget";
import { DataEvent, GameEvent, NetworkEventToS, ProcessEvent } from "../Event/type";
import { SyncStatus } from "./type";
import { GameLogHistory } from "../Components/GameLog/GameLogHistory";
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
        this.resetData();
        director.loadScene("game", () => {
          NetworkEventCenter.emit(NetworkEventToS.GAME_INIT_FINISH_TOS);
        });
      },
      this,
    );
    ProcessEventCenter.on(
      ProcessEvent.START_UNLOAD_GAME_SCENE,
      () => {
        this.isRecord = false;
      },
      this,
    );

    NetworkEventCenter.on(
      NetworkEventToS.DISPLAY_RECORD_TOS,
      () => {
        this.isRecord = true;
      },
      this,
    );

    GameEventCenter.on(GameEvent.GAME_OVER, this.clearData, this);
  }

  createData() {
    // this.gameData = new GameData();
    this.gameLog = new GameLogList();
    // this.gameData.gameLog = this.gameLog;
    this.logHistory = new GameLogHistory();
    this.gameLog.logHistory = this.logHistory;
    // this.gameData.registerEvents();
    this.gameLog.registerEvents();
  }

  clearData() {
    if (this.gameData) {
      if (this.gameData.playerList) {
        for (const player of this.gameData.playerList) {
          for (const skill of player.character.skills) {
            skill.dispose();
          }
        }
      }

      this.gameData = null;
    }

    if (this.gameLog) {
      this.gameLog.unregisterEvents();
      this.gameLog = null;
      this.logHistory = null;
    }
  }

  resetData() {
    DataEventCenter.reset();
    GameEventCenter.reset();
    UIEventCenter.reset();
  }
}
