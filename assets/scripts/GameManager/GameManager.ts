import { _decorator, Component, Node, resources, Prefab, instantiate } from "cc";
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
  cardGroupNode: Node | null = null;

  public gameData: GameData;
  public gameLog: GameLogList;

  onLoad() {
    //初始化GamePools
    GamePools.init({
      card: instantiate(this.cardPrefab).getComponent(CardObject),
      cardGroup: this.cardGroupNode.getComponent(CardGroupObject),
      logMessage: instantiate(this.logPrefab).getComponent(GameLogMessageObject),
    });

    this.gameData = new GameData(this.gameWindow.getComponent(GameUI));
    this.gameLog = new GameLogList(this.logContainer.getComponent(GameLogContainer));
  }

  onEnable() {
    this.gameWindow.active = false;

    //开始选人
    ProcessEventCenter.on(ProcessEvent.START_SELECT_CHARACTER, this.startSelectCharacter, this);

    //游戏初始化
    ProcessEventCenter.on(ProcessEvent.INIT_GAME, this.initGame, this);

    //游戏结束
    GameEventCenter.on(GameEvent.GAME_OVER, this.gameOver, this);

    this.gameData.registerEvents();
    this.gameLog.registerEvents();
  }

  onDisable() {
    //移除事件监听
    ProcessEventCenter.off(ProcessEvent.START_SELECT_CHARACTER, this.startSelectCharacter);
    ProcessEventCenter.off(ProcessEvent.INIT_GAME, this.initGame);
    GameEventCenter.off(GameEvent.GAME_OVER, this.gameOver);
    this.gameData.unregisterEvents();
    this.gameLog.unregisterEvents();
  }

  startSelectCharacter(data: ProcessEventType.StartSelectCharacter) {
    this.selectCharacterWindow.getComponent(SelectCharacter).init({
      identity: createIdentity((<number>data.identity) as IdentityType, (<number>data.secretTask) as SecretTaskType),
      roles: (<number[]>data.characterIdList) as CharacterType[],
      waitingSecond: data.waitingSecond,
    });
  }

  initGame(data: ProcessEventType.InitGame) {
    this.selectCharacterWindow.getComponent(SelectCharacter).hide();
    this.gameWindow.active = true;
    //预加载卡图
    resources.preloadDir("images/cards");
  }

  gameOver(data: GameEventType.GameOver) {
    this.gameWindow.active = false;
    this.gameResultWindow.getComponent(Winner).init(data.players);
    this.gameResultWindow.active = true;
  }
}
