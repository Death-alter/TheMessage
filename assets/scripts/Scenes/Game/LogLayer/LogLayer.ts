import { _decorator, Node, Component } from "cc";
import { GameManager } from "../../../Manager/GameManager";
import { GameLogContainer } from "./GameLogContainer";
import { GameLogWindow } from "./GameLogWindow";

const { ccclass, property } = _decorator;

@ccclass("LogLayer")
export class LogLayer extends Component {
  @property(Node)
  logHistoryNode: Node | null = null;
  @property(Node)
  logContainerNode: Node | null = null;

  public manager: GameManager;
  public logHistory: GameLogWindow;
  public logContainer: GameLogContainer;

  get gameLog() {
    return this.manager.gameLog;
  }

  init(manager: GameManager) {
    this.manager = manager;
    this.logContainer = this.logContainerNode.getComponent(GameLogContainer);
    this.logHistory = this.logHistoryNode.getComponent(GameLogWindow);

    console.log(this.logContainer);
    this.gameLog.gameObject = this.logContainer;
    this.gameLog.logHistory.gameObject = this.logHistory;
    this.logHistory.init();
  }

  startRender() {}

  stopRender() {}
}
